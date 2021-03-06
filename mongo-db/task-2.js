// 1
db.airlines.aggregate([
    {
        $group: {
            _id: "$class",
            total: {$sum: 1}
        }
    },
    {
        $project: {
            _id: 0,
            class: "$_id",
            total: "$total"
        }
    }
]);
// { "class" : "P", "total" : 5683 }
// { "class" : "F", "total" : 140343 }
// { "class" : "L", "total" : 23123 }
// { "class" : "G", "total" : 17499 }

// 2
db.airlines.aggregate([
    {
        $match: {destCountry: {$ne: "UnitedStates"}}
    },
    {
        $group: {
            _id:"$destCity",
            avgPassengers: {$avg: "$passengers"}}
    },
    {
        $sort: {avgPassengers: -1}
    },
    {$limit: 3},
    {
        $project: {
            _id:0,
            avgPassengers:"$avgPassengers",
            city:"$_id",}
    }
]);
// { "avgPassengers" : 8052.380952380952, "city" : "Abu Dhabi, United Arab Emirates" }
// { "avgPassengers" : 7743.661683713612, "city" : "Atlanta, GA" }
// { "avgPassengers" : 7176.596638655462, "city" : "Dubai, United Arab Emirates" }

// 3
db.airlines.aggregate([
    {
        $match: {destCountry: {$eq: "Latvia"}}
    },
    {
        $group: {
            _id: "$destCountry",
            carriers: {$addToSet: "$carrier"}
        }
    }
]);
// { "_id" : "Latvia", "carriers" : [ "Uzbekistan Airways", "Blue Jet SP Z o o", "JetClub AG" ] }

// 4
db.airlines.aggregate([
    {
        $match: {
            originCountry: {$eq: "United States"},
            destCountry: {$in: ["Greece", "Italy", "Spain"]}
        }
    },
    {
        $group: {
            _id: "$carrier",
            total: {$sum: "$passengers"}
        }
    },
    {$sort: {total: -1}},
    {$limit: 10},
    {$skip: 3}
]);
// { "_id" : "Compagnia Aerea Italiana", "total" : 280256 }
// { "_id" : "United Air Lines Inc.", "total" : 229936 }
// { "_id" : "Emirates", "total" : 100903 }
// { "_id" : "Air Europa", "total" : 94968 }
// { "_id" : "Meridiana S.p.A", "total" : 20308 }
// { "_id" : "Norwegian Air Shuttle ASA", "total" : 13344 }
// { "_id" : "VistaJet Limited", "total" : 183 }

// 5
db.airlines.aggregate([
    {$match: {originCountry: {$eq: "United States"}}},
    {
        $group: {
            _id: {originState: "$originState", originCity: "$originCity"},
            total: {$sum: "$passengers"}
        }
    },
    {$sort: {total: -1}},
    {
        $group: {
            _id: "$_id.originState",
            city: {$first: "$_id.originCity"},
            totalPassengers: {$first: "$total"}
        }
    },
    {$sort: {_id: 1}},
    {$limit: 5},
    {
        $project: {
            _id: 0,
            totalPassengers: "$totalPassengers",
            location: {state: "$_id",city: "$city"}
        }
    }
]);
// { "totalPassengers" : 760120, "location" : { "state" : "Alabama", "city" : "Birmingham, AL" } }
// { "totalPassengers" : 1472404, "location" : { "state" : "Alaska", "city" : "Anchorage, AK" } }
// { "totalPassengers" : 13152753, "location" : { "state" : "Arizona", "city" : "Phoenix, AZ" } }
// { "totalPassengers" : 571452, "location" : { "state" : "Arkansas", "city" : "Little Rock, AR" } }
// { "totalPassengers" : 23701556, "location" : { "state" : "California", "city" : "Los Angeles, CA" } }

// 6
db.enron.aggregate(
    [
        {'$project': {'from': '$headers.From', 'to': '$headers.To'}},
        {'$unwind': {'path': '$to'}},
        {'$group': {'_id': {'id': '$_id', 'from': '$from', 'to': '$to'}}},
        {'$group': {'_id': {'from': '$_id.from', 'to': '$_id.to'}, 'total': {'$sum': 1}}},
        {'$sort': {'total': -1}},
        {'$limit': 1},
        {'$project': {'_id': 0,'from': '$_id.from','to': '$_id.to','total': '$total'}}
    ],
    { allowDiskUse: true }
);
// { "from" : "susan.mara@enron.com", "to" : "jeff.dasovich@enron.com", "total" : 750 }
