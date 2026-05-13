export const teams = [
  {
    id: 'mumbai', name: 'Mumbai Meteors', color: '#3ba3ff', rating: 88, strengths: 'Powerplay batting, death bowling', weaknesses: 'Middle over spin', star: 'Rohit Sharma',
    players: [
      makeP(1,'Rohit Sharma',37,'Opener','Anchor',90,18,'RHB','None','Powerplay',['Pull master']),
      makeP(2,'Suryakumar Yadav',35,'Batter','Power hitter',92,20,'RHB','Part-time','Middle',['360 hitter']),
      makeP(3,'Hardik Pandya',32,'All-Rounder','Batting all-rounder',84,80,'RHB','Fast','Death',['Clutch finisher']),
      makeP(4,'Jasprit Bumrah',33,'Bowler','Death bowler',22,95,'RHB','Fast','Death',['Yorker king']),
      makeP(5,'Ishan Kishan',27,'Wicketkeeper','Accumulator',82,10,'LHB','None','Powerplay',['Quick hands']),
      makeP(6,'Tilak Varma',24,'Batter','Spin specialist',82,8,'LHB','None','Middle',['Calm chase']),
      makeP(7,'Piyush Chawla',36,'Bowler','Leg spinner',16,77,'RHB','Leg Spin','Middle',['Googly']),
      makeP(8,'Gerald Coetzee',26,'Bowler','Hit-the-deck pacer',20,82,'RHB','Fast','Middle',['Heavy ball'])
    ]
  },
  {
    id: 'lahore', name: 'Lahore Falcons', color: '#5ff58d', rating: 86, strengths: 'New ball pace, compact top order', weaknesses: 'Finishing under pressure', star: 'Babar Azam',
    players: [
      makeP(11,'Babar Azam',31,'Batter','Anchor',93,15,'RHB','None','Middle',['Classical cover drive']),
      makeP(12,'Abdullah Shafique',26,'Batter','Opener',83,12,'RHB','None','Powerplay',['Backfoot game']),
      makeP(13,'Shaheen Afridi',29,'Bowler','New ball pacer',18,90,'LHB','Fast','Powerplay',['Late swing']),
      makeP(14,'Haris Rauf',31,'Bowler','Death bowler',19,86,'RHB','Fast','Death',['Raw pace']),
      makeP(15,'Mohammad Rizwan',33,'Wicketkeeper','Accumulator',89,16,'RHB','None','Powerplay',['Strike rotation']),
      makeP(16,'Abdul Samad',25,'All-Rounder','Utility player',78,58,'RHB','Medium','Death',['Big sixes']),
      makeP(17,'Rashid Khan',29,'Bowler','Mystery spinner',28,92,'RHB','Leg Spin','Middle',['Wrong-un']),
      makeP(18,'Abdullah Al Mamun',24,'Bowler','Off spinner',22,72,'RHB','Off Spin','Middle',['Drift'])
    ]
  }
];

export const pitchTypes = ['Green pitch','Dusty pitch','Flat batting pitch','Slow turning pitch','Cracked fifth-day pitch'];
export const weatherTypes = ['Sunny','Cloudy','Humid','Dew','Rain threat'];
export const fieldSettings = ['Attacking field','Balanced field','Defensive field','Powerplay field','Death overs field','Spin trap','Boundary riders','Single-saving ring'];
export const battingIntents = ['Defensive','Rotate strike','Balanced','Aggressive','Ultra aggressive'];
export const bowlingPlans = ['Attack stumps','Bowl short','Bowl wide outside off','Slower balls','Yorkers','Spin into rough','Defensive line','Wicket-taking plan'];

function makeP(id,name,age,role,cricketRole,battingSkill,bowlingSkill,battingStyle,bowlingStyle,preferredPhase,specialTraits) {
  return { id, name, age, role, cricketRole, battingSkill, bowlingSkill, fieldingSkill: 70 + (id%25), fitness: 72 + (id%20), form: 65 + (id%30), confidence: 68 + (id%25), aggression: 45 + (id%45), consistency: 60 + (id%35), experience: 58 + (id%40), battingStyle, bowlingStyle, preferredPhase, specialTraits };
}
