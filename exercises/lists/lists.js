var participant = ['Alonso', 'Ellie', 'Rik', 'Steve', 'Julian','Flavio', 'Aucher', 'Yicen', 'George','Isabel', 'Rye', 'Joe', 'Benz'];
console.log(participant.length);

// reports
var report = [];
report[0] = 'Werner Harzag. Lo and Behold';
report[1] = 'Kurgan, Laura. Close up at a Distance';
report[2] = 'Steyerl, Hito. A Sea of Data';
report[3] = 'Kate Crawford, Can an Algorithm be Agnostic?';
report[4] = 'Hayles, Katharine N. Unthought, Chapter 5';
report[5] = 'Hayles, Katharine N. Unthought, Chapter 6';
report[6] = 'Selected UNDP RBA reading';

// pick random, allocate, remove and then pick random again.

var assingment = [];

for(var i=0; i<report.length; i++){
    assingment[i] = { //javascript mongo notation.
        report: report[i],
        team: [] // we are ready to assign people to team.
    }
};

console.log(assingment);

var random = Math.floor(Math.random() * participant.length); // this generates a random number until 13 (participant length)
console.log(random); // random list

for (var key in assingment) {
        while (assingment[key].team.length <2) {
            var random = Math.floor(Math.random() * participant.length); // this generates a random number until 13 (participant length)
            assingment[key].team.push(participant[random]); // this pushes one part into each team array
            participant.splice(random, 1); // delete participant that just got added.
        }
    };




