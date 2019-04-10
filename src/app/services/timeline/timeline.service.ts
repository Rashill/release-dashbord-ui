import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  constructor() { }
}


export class Line {
    text: string;
    id: number;
    color: string;
}

export class Feature {
    text: string;
    id: number;
    color: string;
}

export class Stage {
    text: string;
    ownerId: number[];
    line: number;
    startDate: Date;
    endDate: Date;
}


let lines: Line[] = [
    {
        text: "Planned",
        id: 1,
        color: "#1e90ff"
    }, {
        text: "Actual",
        id: 2,
        color: "#ff9747"
    }
];

let features: Feature[] = [
    {
        text: "Samantha Bright",
        id: 1,
        color: "#cb6bb2"
    }, {
        text: "John Heart",
        id: 2,
        color: "#56ca85"
    }, {
        text: "Todd Hoffman",
        id: 3,
        color: "#1e90ff"
    }, {
        text: "Sandra Johnson",
        id: 4,
        color: "#ff9747"
    }
]

let stages: Stage[] = [{
    "text": "Pre-Release",
    "ownerId": [1],
    "startDate": new Date(2019, 3, 9, 8, 0),
    "endDate": new Date(2019, 3, 12, 10, 30),
    "line": 1
},{
    "text": "Development",
    "ownerId": [2],
    "startDate": new Date(2019, 3, 12, 10, 30),
    "endDate": new Date(2019, 3, 20, 10, 30),
    "line": 1
},{
    "text": "QA",
    "ownerId": [3],
    "startDate": new Date(2019, 3, 25, 10, 30),
    "endDate": new Date(2019, 3, 30, 10, 30),
    "line": 1
},{
    "text": "Release/Verify",
    "ownerId": [4],
    "startDate": new Date(2019, 4, 10, 10, 30),
    "endDate": new Date(2019, 4, 12, 10, 30),
    "line": 1
},{
    "text": "Post-Release",
    "ownerId": [5],
    "startDate": new Date(2019, 4, 12, 10, 30),
    "endDate": new Date(2019, 4, 25, 10, 30),
    "line": 1
}];

@Injectable()
export class DevCycle {
    getStages(){
        return stages;
    }
    getLines() {
        return lines;
    }
    getFeatures() {
        return features;
    }
}
