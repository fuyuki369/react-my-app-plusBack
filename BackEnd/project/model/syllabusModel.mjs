/*シラバスデータベース(仮)*/

let dummyResults = [ 
    { 
        id: 1, 
        name: "英語基礎",
        semester: "前期",
        faculty: ["文学部","経済学部"],
        day: "月", 
        period: 3, 
        summary: "英語の基礎を学ぶ授業です" 
    },
    { 
        id: 2, 
        name: "数学A", 
        semester: "前期",
        faculty: ["文学部","工学部","経済学部"],
        day: "火", 
        period: 2, 
        summary: "代数を中心に学習します" 
    },
    {
        id: 3,
        name: "情報リテラシー", 
        semester: "後期",
        faculty: ["工学部","経済学部"],
        day: "水", 
        period: 1, 
        summary: "コンピュータの基本操作を学ぶ" 
    },
];


//データを送る
export function getSyllabus(){
    return dummyResults;
}