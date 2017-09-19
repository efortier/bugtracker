var express = require('express');
var router = express.Router();
var Issues = require('../models/db_issues');

router.post('/getpage', function (req, res, next) {

    const page = req.body;
    Issues.getIssuesByPage(page, (err, issues) => {
        if (err) throw err;
        if (!issues) {
            return res.json({
                "success": false,
            });
        } else {
            // console.log('Page: ', page);
            // console.log('Issues: ', issues);
            return res.json({
                "success": true,
                "totalElements": page.totalElements,
                "issues": issues
            });
        }
    });

});

router.get('/getprojects', function (req, res, next) {

    Issues.getProjects((err, projects) => {
        if (err) throw err;
        if (!projects) {
            return res.json({
                "success": false,
            });
        } else {
            return res.json({
                "success": true,
                "projects": projects
            });
        }
    });

});

router.get('/gettypes', function (req, res, next) {

    Issues.getTypes((err, issueTypes) => {
        if (err) throw err;
        if (!issueTypes) {
            return res.json({
                "success": false,
            });
        } else {
            return res.json({
                "success": true,
                "types": issueTypes
            });
        }

    });

});

router.get('/getseverity', function (req, res, next) {

    Issues.getSeverity((err, severity) => {
        if (err) throw err;
        if (!severity) {
            return res.json({
                "success": false,
            });
        } else {
            return res.json({
                "success": true,
                "severity": severity
            });
        }

    });

});

router.get('/getstates', function (req, res, next) {
    
    Issues.getStates((err, states) => {
        if (err) throw err;
        if (!states) {
            return res.json({
                "success": false,
            });
        } else {
            return res.json({
                "success": true,
                "states": states
            });
        }

    });

});
    
router.get('/getusers', function (req, res, next) {

    Issues.getUsers((err, users) => {
        if (err) throw err;
        if (!users) {
            return res.json({
                "success": false,
            });
        } else {
            return res.json({
                "success": true,
                "users": users
            });
        }

    });

});

router.post('/savereport', function (req, res, next) {
    //console.log('SaveReport: Body:', req.body);
    const report = req.body;
    Issues.saveReport( report, (err, savedReport) => {
        if (err) {
            throw err;
        } else {
            return res.json({
                "success": true,
                "report_id": savedReport._id,
            });
        }
    });
});
    
router.post('/getreport', function (req, res, next) {
    const report_id = req.body.report_id;
    Issues.getReport( report_id, (err, report) => {
        if (err) {
            throw err;
        } else {
            if( !report) {
                return res.json({
                    "success": false,
                });
            } else {
                return res.json({
                    "success": true,
                    "report": report,
                });
            }
        }
    });
});
    
router.post('/updatereport', function (req, res, next) {
    Issues.updateReport( req.body, (err, updatedReport) => {
        if (err) {
            throw err;
        } else {
            //console.log('updated report:', updatedReport);
            if( !updatedReport) {
                return res.json({
                    "success": false
                });
    
            } else {
                return res.json({
                    "success": true
                });
            }
        }
    });
});

router.post('/reportexists', function (req, res, next) {
    Issues.reportExists( req.body.report_id, (err, count) => {
        if (err) {
            throw err;
        } else {
            if(!count) {
                return res.json({
                    "success": false
                });
    
            } else {
                return res.json({
                    "success": true
                });
            }
        }
    });
});

router.post('/deletereport', function (req, res, next) {
    Issues.deleteReport( req.body.report_id, (err, report) => {
        if (err) {
            throw err;
        } else {
            if(!report) {
                return res.json({
                    "success": false
                });
    
            } else {
                return res.json({
                    "success": true
                });
            }
        }
    });
});

module.exports = router;