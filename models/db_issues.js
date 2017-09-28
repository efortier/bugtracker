const mongoose = require('mongoose'); 
var ObjectId = require('mongodb').ObjectId;

const issuesSchema = mongoose.Schema( {
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  issue_author: {
    type:String, 
    required:true
  }, 
  issue_title: {
    type:String, 
    required:true
  }, 
  issue_description: {
    type:String, 
    required:true
  }, 
  issue_project: {
    type:String, 
    required:true
  }, 
  issue_type: {
    type:String, 
    required:true
  }, 
  issue_severity: {
    type:String, 
    required:true
  }, 
  issue_tags: {
    type:String, 
    required:false
  }, 
  issue_status: {
    type:String, 
    required:true
  }, 
  issue_assignee: {
    type:String, 
    required:false
  }, 
  issue_feedback: {
    type:String, 
    required:false
  },
  // issues_createdat: {
  //   type: Date,
  //   required: false
  // },

  },  {
    collection:'issues'
  }); 
  const Issues = module.exports = mongoose.model('Issues', issuesSchema); 

issuesSchema.virtual('created').get( function () {
  if (this["_created"]) return this["_created"];
  return this["_created"] = this._id.getTimestamp();
});

const projectsSchema = mongoose.Schema( {
  project_id: {
    type:String, 
    required:true
  }, 
  project_name: {
    type:String, 
    required:true
  }
},  {
  collection:'projects'
}); 
const Projects = module.exports = mongoose.model('Projects', projectsSchema); 

const typeSchema = mongoose.Schema( {
  type_id: {
    type:String, 
    required:true
  }, 
  type_name: {
    type:String, 
    required:true
  }
},  {
  collection:'types'
}); 
const IssueTypes = module.exports = mongoose.model('Types', typeSchema); 

const severitySchema = mongoose.Schema( {
  severity_id: {
    type:String, 
    required:true
  }, 
  severity_name: {
    type:String, 
    required:true
  }
},  {
  collection:'severity'
}); 
const Severity = module.exports = mongoose.model('Severity', severitySchema); 

const usersSchema = mongoose.Schema( {
  user_id: {
    type:String, 
    required:true
  }, 
  user_name: {
    type:String, 
    required:true
  }
},  {
  collection:'users'
}); 
const Users = module.exports = mongoose.model('Users', usersSchema); 

const statesSchema = mongoose.Schema( { status_name: String }, { collection: 'report_states' } );
const States = module.exports = mongoose.model('States', statesSchema); 

//   _.isEmpty = function(obj) {
//     if (obj == null) return true;
//     if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
//     return _.keys(obj).length === 0;
//   };

module.exports.getIssuesByPage = function (page, callback) {

  var query =  {}; 
  const regex =  {
    "$regex":"", 
    "$options":"i"
  }; 

  // apply filters.
  if (page.titleFilter) {
    query.issue_title={};
    query.issue_title.$regex = page.titleFilter; 
    query.issue_title.$options = "i"; 
  }
  if (page.projectFilter) {
    query.issue_project={};
    query.issue_project.$regex = page.projectFilter; 
    query.issue_project.$options = "i"; 
  }
  if (page.typeFilter) {
    query.issue_type={};
    query.issue_type.$regex = page.typeFilter; 
    query.issue_type.$options = "i"; 
  }
  if (page.severityFilter) {
    query.issue_severity={};
    query.issue_severity.$regex = page.severityFilter; 
    query.issue_severity.$options = "i"; 
  }
  if (page.statusFilter) {
    query.issue_status={};
    query.issue_status.$regex = page.statusFilter; 
    query.issue_status.$options = "i"; 
  }
  //console.log('page query: ', query);

  // count the total number of entries for this query.
  // NOTE:count() is async, so processing that relies on the results need to be included in the callback.
  page.totalElements = 0; 
  Issues.count(query, (err, count) =>  {

    //console.log('page query count: ', count);

    //console.log( 'count retrieved: ', count );
    page.totalElements = count; 

    // this could be made A LOT faster on larger databases. using sort and recoding last entry's ID.
    Issues.find(query).sort({'_id': 'asc'}).skip(page.pageNumber * page.pageSize).limit(page.pageSize).exec(callback);

  });

};

module.exports.getProjects = function (callback) {
  Projects.find().sort('{"_id": 1}').exec(callback);
};

module.exports.getTypes = function (callback) {
  IssueTypes.find().sort('{"_id": 1}').exec(callback);
};

module.exports.getSeverity = function (callback) {
  Severity.find().sort('{"_id": 1}').exec(callback);
};

module.exports.getUsers = function (callback) {
  Users.find().sort('{"_id": 1}').exec(callback);
//  Users.find(callback);
};

module.exports.saveReport = function (report, callback) {

  const issue = new Issues({
    issue_author: report.username,
    issue_project: report.project,
    issue_type: report.type,
    issue_severity: report.severity,
    issue_title: report.title,
    issue_description: report.description,
    issue_tags: report.tags,
    issue_status: 'new'
  });

  issue.save(callback);

};

module.exports.getReport = function (report_id, callback) {
  Issues.findOne({
    _id: ObjectId(report_id)
  }, callback);
};

module.exports.getStates = function (callback) {
  States.find().sort('{"_id": 1}').exec(callback);
};

module.exports.updateReport = function (report, callback) {

  const updatedIssue = { $set: {
    '_id': report._id,
    'issue_author': report.issue_author,
    'issue_project': report.issue_project,
    'issue_type': report.issue_type,
    'issue_severity': report.issue_severity,
    'issue_title': report.issue_title,
    'issue_description': report.issue_description,
    'issue_tags': report.issue_tags,
    'issue_status': report.issue_status,
    'issue_feedback': report.issue_feedback,
    'issue_assignee': report.issue_assigned
  } };

  const query = {'_id': report._id};
  Issues.findOneAndUpdate(query, updatedIssue, {new: true}, callback );

};

module.exports.reportExists = function (report_id, callback) {
  const query = {'_id': report_id};
  Issues.count(query, callback );
};

module.exports.deleteReport = function (report_id, callback) {
  const query = {'_id': report_id}
  Issues.findOneAndRemove( query, callback );
};

