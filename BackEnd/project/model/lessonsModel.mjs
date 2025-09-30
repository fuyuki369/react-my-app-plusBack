/*授業一覧データベース(仮)*/

let Lessons = [  //仮のデータベース
    {
        id: 1,
        name: "英語基礎",
        day: "月",
        period: 3,
        startDate: "2025-04-01",
        endDate: "2125-07-31",
        isCurrent: true,
    },
    {
        id: 2,
        name: "数学A",
        day: "火",
        period: 2,
        startDate: "1925-04-01",
        endDate: "1925-07-31",
        isCurrent: true,
    },
    {
        id: 3,
        name: "情報リテラシー",
        day: "月",
        period: 3,
        startDate: "2025-04-01",
        endDate: "2125-07-31",
        isCurrent: true,
    },
    {
        id: 4,
        name: "情報セキュリティ",
        day: "金",
        period: 4,
        startDate: "2025-04-01",
        endDate: "2125-07-31",
        isCurrent: true,
    },
]

//授業一覧を渡す
export function getLessons() {
    return Lessons;
}
