var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
var moment = require('moment');
var j2xls = require('json2xls-xml')({ pretty: true });
var address,
    os = require('os'),
    ifaces = os.networkInterfaces();
var portNum = 80;
var data = [];
var oldData = [];
var dir = './reports/';
var teams_dir = './teams/';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
if (!fs.existsSync(teams_dir)) {
    fs.mkrdirSync(teams_dir);
}

var fileName = dir + moment().format('M;D;YYYY;H;mm;ss');
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '100mb'
    })
);

var fileName = dir + moment().format("M;D;YYYY;H;mm;ss");
fs.readdirSync(dir).forEach((file) => {
    // you may want to filter these by extension, etc. to make sure they are JSON files
    if (file.includes(".json") && !file.includes(fileName)) {
        try {
            records = JSON.parse(fs.readFileSync(dir + file, 'utf8'))
        } catch (e) { return; }
        for (var i = records.length - 1; i >= 0; i--) oldData.push(records[i])
    }

})

app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '100mb'
}));

function newRecords(records) {
    var team_data;
    var team_num = records[0].team;

    for (var i = records.length - 1; i >= 0; i--) {
        convert(records[i])
        data.push(records[i])
        console.log(records[i])
    }

    fs.writeFile(fileName + ".xlsx", j2xls(data), 'binary', function(err) {
        error(err);
    });
    fs.writeFile(fileName + ".json", JSON.stringify(data, null, 4), 'binary', function(err) {
        error(err);
    });
    /* 
    The code below writes to the json file of the corresponding team
    */
    if (!fs.existsSync(teams_dir + team_num + ".json")) {
        var team_data = fs.readFileSync(teams_dir + 'template.json', 'utf-8');
        team_data.team_number = team_num;
    } else {
        var team_data = fs.readFileSync(teams_dir + team_num + '.json', 'utf-8');
    }
    team_data = JSON.parse(team_data);
    /*
    The code below sets the variables in the json to info from the submission forms
    */
    team_data.match_history
    fs.writeFileSync(teams_dir + team_num + ".json", team_data, function(err) {
        if (err) throw err;
    }) 
}
app.use(cors());
app.use('/', express.static(__dirname + '/dist'));
fs.writeFile(fileName + '.xlsx', j2xls(data), 'binary', function(err) {
    error(err);
});
fs.writeFile(fileName + '.json', JSON.stringify(data, null, 4), 'binary', function(err) {
    error(err);
});
app.post('/api', function(req, res) {
    newRecords(req.body)
    res.sendStatus(200);
});
app.get('/api', function(req, res) {
    allData = []
    for (var i = oldData.length - 1; i >= 0; i--) {
        allData.push(oldData[i])
    }
    for (var i = data.length - 1; i >= 0; i--) {
        allData.push(data[i])
    }
    res.send(JSON.stringify(allData, null, 4));
});
app.get('/download', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/force-download',
        'Content-disposition': 'attachment; filename=latest.xlsx'
    });
    res.end(j2xls(data));
});
app.get('/search', function(req, res) {
    var query = req.body['SearchBar'];
});

serverStopper = app.listen(portNum, function() {});
for (var dev in ifaces) {
    var iface = ifaces[dev].filter(function(details) {
        return details.family === 'IPv4' && details.internal === false;
    });
    if (iface.length > 0) address = iface[0].address;
}
console.log(address);

function error(err) {
    if (err) {
        return console.log(err);
    }
}


function convert(obj) { //turns object.arrays into strings
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] instanceof Array) {
                obj[key] = obj[key].toString()
            }
        }
    }
    return obj;
}