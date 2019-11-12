// 3.1
db.restaurants.find({borough: "Queens", cuisine: "Chinese"}).count();
// 728

// 3.2
db.restaurants.aggregate([
	{$unwind: "$grades"},
	{$sort: {"grades.score": -1}},
	{$limit: 1},
	{$project: {_id: 1}}
]);
// { "_id" : ObjectId("5dc95c58780ca3b6d69a9fde") }

// 3.3
db.restaurants.updateMany(
	{borough: "Manhattan"},
	{$push: {grades: {grade: "A", score: 7, date: ISODate()}}}
);
// { "acknowledged" : true, "matchedCount" : 10259, "modifiedCount" : 10259 }

// 3.4
db.restaurants.find({"grades.8.score": {$lt: 7}}, {name: 1, _id: 0});
// { "name" : "Silver Krust West Indian Restaurant" }
// { "name" : "Pure Food" }

// 3.5
db.restaurants.find({
		cuisine: "Seafood",
		grades: {
			$elemMatch: {
				grade:'B',
				date: {$gte: ISODate("2014-02-01"), $lte: ISODate("2014-03-01")}
			}
		}
	},
	{borough: 1}
);
// { "_id" : ObjectId("5dc95c59780ca3b6d69ad3de"), "borough" : "Bronx" }
// { "_id" : ObjectId("5dc95c59780ca3b6d69ad654"), "borough" : "Manhattan" }

// 4.1
db.restaurants.createIndex({name: 1}, {name: "name_index"});
// > db.restaurants.explain().find({ name: "Glorious Food" })
// {
// 	"queryPlanner" : {
// 			"plannerVersion" : 1,
// 			"namespace" : "frontcamp.restaurants",
// 			"indexFilterSet" : false,
// 			"parsedQuery" : {
// 					"name" : {
// 							"$eq" : "Glorious Food"
// 					}
// 			},
// 			"queryHash" : "01AEE5EC",
// 			"planCacheKey" : "4C5AEA2C",
// 			"winningPlan" : {
// 					"stage" : "FETCH",
// 					"inputStage" : {
// 							"stage" : "IXSCAN",
// 							"keyPattern" : {
// 									"name" : 1
// 							},
// 							"indexName" : "name_index",
// 							"isMultiKey" : false,
// 							"multiKeyPaths" : {
// 									"name" : [ ]
// 							},
// 							"isUnique" : false,
// 							"isSparse" : false,
// 							"isPartial" : false,
// 							"indexVersion" : 2,
// 							"direction" : "forward",
// 							"indexBounds" : {
// 									"name" : [
// 											"[\"Glorious Food\", \"Glorious Food\"]"
// 									]
// 							}
// 					}
// 			},
// 			"rejectedPlans" : [ ]
// 	},
// 	"serverInfo" : {
// 			"host" : "EPBYMINW1240",
// 			"port" : 27017,
// 			"version" : "4.2.1",
// 			"gitVersion" : "edf6d45851c0b9ee15548f0f847df141764a317e"
// 	},
// 	"ok" : 1
// }

// 4.2
db.restaurants.dropIndex("name_index");

// 4.3
db.restaurants.createIndex({restaurant_id: 1, borough: 1}, {name: "restaurant_index"});
// > db.restaurants.explain().find({ restaurant_id: "41098650" }, { _id: 0, borough: 1 })
// {
// 	"queryPlanner" : {
// 			"plannerVersion" : 1,
// 			"namespace" : "frontcamp.restaurants",
// 			"indexFilterSet" : false,
// 			"parsedQuery" : {
// 					"restaurant_id" : {
// 							"$eq" : "41098650"
// 					}
// 			},
// 			"queryHash" : "11B8AFCC",
// 			"planCacheKey" : "A2837C36",
// 			"winningPlan" : {
// 					"stage" : "PROJECTION_COVERED",
// 					"transformBy" : {
// 							"_id" : 0,
// 							"borough" : 1
// 					},
// 					"inputStage" : {
// 							"stage" : "IXSCAN",
// 							"keyPattern" : {
// 									"restaurant_id" : 1,
// 									"borough" : 1
// 							},
// 							"indexName" : "restaurant_index",
// 							"isMultiKey" : false,
// 							"multiKeyPaths" : {
// 									"restaurant_id" : [ ],
// 									"borough" : [ ]
// 							},
// 							"isUnique" : false,
// 							"isSparse" : false,
// 							"isPartial" : false,
// 							"indexVersion" : 2,
// 							"direction" : "forward",
// 							"indexBounds" : {
// 									"restaurant_id" : [
// 											"[\"41098650\", \"41098650\"]"
// 									],
// 									"borough" : [
// 											"[MinKey, MaxKey]"
// 									]
// 							}
// 					}
// 			},
// 			"rejectedPlans" : [ ]
// 	},
// 	"serverInfo" : {
// 			"host" : "EPBYMINW1240",
// 			"port" : 27017,
// 			"version" : "4.2.1",
// 			"gitVersion" : "edf6d45851c0b9ee15548f0f847df141764a317e"
// 	},
// 	"ok" : 1
// }

// 4.4
db.restaurants.createIndex(
	{cuisine: 1},
	{
		name: "partial_cuisine_index",
		partialFilterExpression: {borough: "Staten Island"}
	}
);
// > db.restaurants.explain().find({ borough: "Staten Island", cuisine: "American" })
// {
// 	"queryPlanner" : {
// 			"plannerVersion" : 1,
// 			"namespace" : "frontcamp.restaurants",
// 			"indexFilterSet" : false,
// 			"parsedQuery" : {
// 					"$and" : [
// 							{
// 									"borough" : {
// 											"$eq" : "Staten Island"
// 									}
// 							},
// 							{
// 									"cuisine" : {
// 											"$eq" : "American"
// 									}
// 							}
// 					]
// 			},
// 			"queryHash" : "DBDC0200",
// 			"planCacheKey" : "77ECB1E7",
// 			"winningPlan" : {
// 					"stage" : "FETCH",
// 					"filter" : {
// 							"borough" : {
// 									"$eq" : "Staten Island"
// 							}
// 					},
// 					"inputStage" : {
// 							"stage" : "IXSCAN",
// 							"keyPattern" : {
// 									"cuisine" : 1
// 							},
// 							"indexName" : "partial_cuisine_index",
// 							"isMultiKey" : false,
// 							"multiKeyPaths" : {
// 									"cuisine" : [ ]
// 							},
// 							"isUnique" : false,
// 							"isSparse" : false,
// 							"isPartial" : true,
// 							"indexVersion" : 2,
// 							"direction" : "forward",
// 							"indexBounds" : {
// 									"cuisine" : [
// 											"[\"American\", \"American\"]"
// 									]
// 							}
// 					}
// 			},
// 			"rejectedPlans" : [ ]
// 	},
// 	"serverInfo" : {
// 			"host" : "EPBYMINW1240",
// 			"port" : 27017,
// 			"version" : "4.2.1",
// 			"gitVersion" : "edf6d45851c0b9ee15548f0f847df141764a317e"
// 	},
// 	"ok" : 1
// }

// > db.restaurants.explain().find({ borough: "Staten Island", name: "Bagel Land" })
// {
// 	"queryPlanner" : {
// 			"plannerVersion" : 1,
// 			"namespace" : "frontcamp.restaurants",
// 			"indexFilterSet" : false,
// 			"parsedQuery" : {
// 					"$and" : [
// 							{
// 									"borough" : {
// 											"$eq" : "Staten Island"
// 									}
// 							},
// 							{
// 									"name" : {
// 											"$eq" : "Bagel Land"
// 									}
// 							}
// 					]
// 			},
// 			"queryHash" : "D9E6DF40",
// 			"planCacheKey" : "54301B90",
// 			"winningPlan" : {
// 					"stage" : "COLLSCAN",
// 					"filter" : {
// 							"$and" : [
// 									{
// 											"borough" : {
// 													"$eq" : "Staten Island"
// 											}
// 									},
// 									{
// 											"name" : {
// 													"$eq" : "Bagel Land"
// 											}
// 									}
// 							]
// 					},
// 					"direction" : "forward"
// 			},
// 			"rejectedPlans" : [ ]
// 	},
// 	"serverInfo" : {
// 			"host" : "EPBYMINW1240",
// 			"port" : 27017,
// 			"version" : "4.2.1",
// 			"gitVersion" : "edf6d45851c0b9ee15548f0f847df141764a317e"
// 	},
// 	"ok" : 1
// }

// > db.restaurants.explain().find({ borough: "Queens", cuisine: "Pizza" })
// {
// 	"queryPlanner" : {
// 			"plannerVersion" : 1,
// 			"namespace" : "frontcamp.restaurants",
// 			"indexFilterSet" : false,
// 			"parsedQuery" : {
// 					"$and" : [
// 							{
// 									"borough" : {
// 											"$eq" : "Queens"
// 									}
// 							},
// 							{
// 									"cuisine" : {
// 											"$eq" : "Pizza"
// 									}
// 							}
// 					]
// 			},
// 			"queryHash" : "DBDC0200",
// 			"planCacheKey" : "4FC4670D",
// 			"winningPlan" : {
// 					"stage" : "COLLSCAN",
// 					"filter" : {
// 							"$and" : [
// 									{
// 											"borough" : {
// 													"$eq" : "Queens"
// 											}
// 									},
// 									{
// 											"cuisine" : {
// 													"$eq" : "Pizza"
// 											}
// 									}
// 							]
// 					},
// 					"direction" : "forward"
// 			},
// 			"rejectedPlans" : [ ]
// 	},
// 	"serverInfo" : {
// 			"host" : "EPBYMINW1240",
// 			"port" : 27017,
// 			"version" : "4.2.1",
// 			"gitVersion" : "edf6d45851c0b9ee15548f0f847df141764a317e"
// 	},
// 	"ok" : 1
// }

// 4.5
db.restaurants.createIndex({"grades.8.score": 1, name: 1}, {name: "grades_index"})
// > db.restaurants.explain().find({"grades.8.score": {$lt: 7}}, {name: 1, _id: 0});
// {
// 	"queryPlanner" : {
// 			"plannerVersion" : 1,
// 			"namespace" : "frontcamp.restaurants",
// 			"indexFilterSet" : false,
// 			"parsedQuery" : {
// 					"grades.8.score" : {
// 							"$lt" : 7
// 					}
// 			},
// 			"queryHash" : "03034A2A",
// 			"planCacheKey" : "3B1B8634",
// 			"winningPlan" : {
// 					"stage" : "PROJECTION_COVERED",
// 					"transformBy" : {
// 							"name" : 1,
// 							"_id" : 0
// 					},
// 					"inputStage" : {
// 							"stage" : "IXSCAN",
// 							"keyPattern" : {
// 									"grades.8.score" : 1,
// 									"name" : 1
// 							},
// 							"indexName" : "grades.8.score_1_name_1",
// 							"isMultiKey" : true,
// 							"multiKeyPaths" : {
// 									"grades.8.score" : [
// 											"grades"
// 									],
// 									"name" : [ ]
// 							},
// 							"isUnique" : false,
// 							"isSparse" : false,
// 							"isPartial" : false,
// 							"indexVersion" : 2,
// 							"direction" : "forward",
// 							"indexBounds" : {
// 									"grades.8.score" : [
// 											"[-inf.0, 7.0)"
// 									],
// 									"name" : [
// 											"[MinKey, MaxKey]"
// 									]
// 							}
// 					}
// 			},
// 			"rejectedPlans" : [ ]
// 	},
// 	"serverInfo" : {
// 			"host" : "EPBYMINW1240",
// 			"port" : 27017,
// 			"version" : "4.2.1",
// 			"gitVersion" : "edf6d45851c0b9ee15548f0f847df141764a317e"
// 	},
// 	"ok" : 1
// }
