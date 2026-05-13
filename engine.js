import { battingIntents, bowlingPlans, fieldSettings } from './data.js';

export function createMatchState(home, away, config) {
  const innings = { runs:0, wkts:0, balls:0, target:null, striker:0, nonStriker:1, batters: seedBatters(home.xi), bowler: away.bowling[0], bowlerStats:{}, recent:[], commentary:[], worm:[], momentum:50, winProb:50, freeHit:false };
  away.bowling.forEach(p=> innings.bowlerStats[p.id] = { overs:0, balls:0, runs:0, wkts:0, stamina: p.fitness, rhythm: p.form });
  return { format:'T20', maxBalls:120, phase:'Powerplay', home, away, toss:config.toss, battingIntent:'Balanced', bowlingPlan:'Attack stumps', fieldSetting:'Balanced field', innings, result:null };
}

function seedBatters(team){ return team.xi.map(p=>({ ...p, runs:0, balls:0 })); }

export function simulateBall(state){
  const i = state.innings;
  const striker = i.batters[i.striker];
  const bowler = state.away.bowling.find(b=>b.id===i.bowler.id) || state.away.bowling[0];
  const bstats = i.bowlerStats[bowler.id];
  const pressure = Math.max(0, (i.balls>60 ? (requiredRate(state)-currentRunRate(state))*3 : 0));
  const intent = battingIntents.indexOf(state.battingIntent);
  const plan = bowlingPlans.indexOf(state.bowlingPlan);
  const field = fieldSettings.indexOf(state.fieldSetting);

  let attack = striker.battingSkill + striker.form*0.4 + striker.confidence*0.6 + intent*4 - pressure;
  let defend = bowler.bowlingSkill + bstats.rhythm*0.6 + plan*3 + pitchMod(state) + weatherMod(state);
  attack -= fatiguePenalty(striker); defend -= fatiguePenaltyBowler(bstats);

  const chaos = Math.random()*30;
  const advantage = attack - defend + chaos;
  let outcome = { type:'run', runs:0, text:'Dot ball.' };
  if (Math.random()<0.02) outcome = { type:'injury', runs:0, text:`${striker.name} looks hurt but continues.` };
  else if (Math.random()<0.02) outcome = { type:'wide', runs:1, text:'Wide called by umpire.' };
  else if (Math.random()<0.01) { i.freeHit = true; outcome = { type:'noball', runs:1, text:'No-ball! Free hit coming.' }; }
  else if (advantage < 20 || (state.innings.freeHit===false && Math.random()<0.05 + intent*0.01)) outcome = wicketEvent(striker,bowler);
  else outcome = runEvent(advantage, field);

  applyOutcome(state, outcome, striker, bowler, bstats);
  return outcome;
}

function applyOutcome(state, out, striker, bowler, bstats){
  const i=state.innings;
  if (out.type==='wide' || out.type==='noball'){ i.runs += out.runs; bstats.runs += out.runs; pushBall(i, out.runs+'wd'); pushCommentary(i,out.text); return; }
  i.balls +=1; striker.balls +=1; bstats.balls +=1; bstats.overs = Math.floor(bstats.balls/6) + (bstats.balls%6)/10;
  if (out.type==='wicket' && !i.freeHit){ i.wkts +=1; bstats.wkts +=1; pushBall(i,'W'); pushCommentary(i,out.text); nextBatter(i); }
  else { i.runs += out.runs; striker.runs += out.runs; bstats.runs += out.runs; pushBall(i, String(out.runs)); pushCommentary(i, out.text); if (out.runs%2===1) [i.striker,i.nonStriker]=[i.nonStriker,i.striker]; }
  i.freeHit = false;
  if (i.balls%6===0){ [i.striker,i.nonStriker]=[i.nonStriker,i.striker]; rotateBowler(state); }
  i.worm.push(i.runs); i.momentum = Math.max(5, Math.min(95, i.momentum + (out.runs>=4?6:out.type==='wicket'?-8:1))); i.winProb = Math.max(5,Math.min(95, 45 + (i.runs - i.wkts*8 - i.balls*0.6)/2));
}

function nextBatter(i){ const next = i.batters.findIndex((b,idx)=> idx>Math.max(i.striker,i.nonStriker) && b.balls===0 && b.runs===0); if (next!==-1) i.striker = next; }
function rotateBowler(state){ const over = state.innings.balls/6; state.phase = over<=6?'Powerplay':over>=16?'Death':'Middle'; const pool=state.away.bowling; const pick = pool[(Math.floor(over)+1)%pool.length]; state.innings.bowler = pick; }
function pushBall(i,val){ i.recent.unshift(val); i.recent=i.recent.slice(0,12); }
function pushCommentary(i,text){ i.commentary.unshift(text); i.commentary=i.commentary.slice(0,20); }
function runEvent(adv,field){ if (adv>68) return {type:'run',runs:6,text:'MONSTER SIX! Crowd erupts.'}; if (adv>55) return {type:'run',runs:4,text:'Cracked through covers for FOUR!'}; if (adv>45) return {type:'run',runs:3,text:'Excellent running, three taken.'}; if (adv>35) return {type:'run',runs:2,text:'Driven into the gap for two.'}; if (adv>25) return {type:'run',runs:1,text:'Neat single keeps strike moving.'}; return {type:'run',runs:Math.random()<0.12+field*0.01?1:0,text:Math.random()<0.2?'Play and miss!':'Dot ball with pressure rising.'}; }
function wicketEvent(striker,bowler){ const modes=['bowled','caught','LBW','run out','stumped','hit wicket']; const m=modes[Math.floor(Math.random()*modes.length)]; return { type:'wicket', runs:0, text:`WICKET! ${striker.name} ${m} by ${bowler.name}.` }; }
function fatiguePenalty(p){ return (100-p.fitness)*0.1; }
function fatiguePenaltyBowler(b){ return (60-b.stamina)*0.08; }
function pitchMod(s){ return s.toss.pitch.includes('Green')?6:s.toss.pitch.includes('Flat')?-7:s.toss.pitch.includes('Slow')?4:2; }
function weatherMod(s){ return s.toss.weather.includes('Cloudy')?4:s.toss.weather.includes('Dew')?-4:s.toss.weather.includes('Humid')?2:0; }
export function currentRunRate(state){ return state.innings.balls? (state.innings.runs/(state.innings.balls/6)):0; }
export function requiredRate(state){ return 8.5; }
