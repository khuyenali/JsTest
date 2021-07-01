const factories = [
    { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
    { name: "BR2", employees: ["Jessie", "Karen", "John"] },
    { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
    { name: "BR4", employees: [] }
]; //

const employeeType = [
    { id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00" },
    { id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00" },
    { id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00" },
];

const employees = [
    { id: 1, name: "Alice", type: 2 },
    { id: 2, name: "Bob", type: 3 },
    { id: 3, name: "John", type: 2 },
    { id: 4, name: "Karen", type: 1 },
    { id: 5, name: "Miles", type: 3 },
    { id: 6, name: "Henry", type: 1 }
];

const tasks = [
    { id: 1, title: "task01", duration: 60 },
    { id: 2, title: "task02", duration: 120 },
    { id: 3, title: "task03", duration: 180 },
    { id: 4, title: "task04", duration: 360 },
    { id: 5, title: "task05", duration: 30 },
    { id: 6, title: "task06", duration: 220 },
    { id: 7, title: "task07", duration: 640 },
    { id: 8, title: "task08", duration: 250 },
    { id: 9, title: "task09", duration: 119 },
    { id: 10, title: "task10", duration: 560 },
    { id: 11, title: "task11", duration: 340 },
    { id: 12, title: "task12", duration: 45 },
    { id: 13, title: "task13", duration: 86 },
    { id: 14, title: "task14", duration: 480 },
    { id: 15, title: "task15", duration: 900 }
];

//1. Count Employees Number by Factory // => [ {name: 'BR1', count: 4}, ... ]
function answer1() {
    const ans = factories.map(({ name, employees }) => {
        return { name, count: employees.length }
    })
    return ans
}

//2. Count Factories Number by Employee // => [ {employee: 'John', count: 2}, ... ]
function answer2() {
    const employeesList = {}
    for (let factory of factories) {
        for (let employee of factory.employees) {
            if (employeesList[employee]) {
                employeesList[employee]++;
            } else {
                employeesList[employee] = 1
            }
        }
    }
    const ans = []
    for (const [employee, count] of Object.entries(employeesList)) {
        ans.push({ employee, count })
    }
    return ans
}

//3. Order employees list by alphabetical order // =>   { name: "BR2", employees: ["Jessie", "John", "Karen"] }
function answer3() {
    const ans = factories.map(({ name, employees }) => {
        return { name, employees: employees.sort() }
    })
    return ans
}

//4. Count total hours worked in 1 day ? // => 39
function answer4() {
    const ans = employeeType.map(({ id, name, work_begin, work_end }) => {
        const [start, end] = getStartAndEndTime({ work_begin, work_end })
        let hourDiff = (end - start) / 3600000 // = 3600 milisecond
        return { id, name, total_hours_worked: hourDiff }
    })
    return ans
}

//5. Make a function that take as parameters dayTime and return number of employee working // howManyEmployeeByTime(time) => int
function answer5(time) {
    const inputTime = new Date("01/01/00 " + time).getTime()
    if (!inputTime) {
        return -1
    }
    const isTypeWorking = employeeType.map((type) => {
        const [start, end] = getStartAndEndTime(type)
        return (inputTime >= start && inputTime <= end) ? 1 : 0
    })
    const ans = employees.reduce((employeeWorking, { type }) => {
        return employeeWorking + isTypeWorking[type - 1]
    }, 0)
    return ans
}

//Used in answer4 and answer5
function getStartAndEndTime({ work_begin, work_end }) {
    let date = "01/01/00 "
    const start = new Date(date + work_begin).getTime()
    if (work_end === "00:00:00") {
        date = "01/02/00 "
    }
    const end = new Date(date + work_end).getTime();
    return [start, end]
}

//6. How many days of work needed to done all tasks ? // => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count.
//1 day 15 hr = 900 min
//Assume each task can be done in next day if the current day don't have enough time
function answer6() {
    const totalDuration = tasks.reduce((totalDuration, { duration }) => totalDuration + duration, 0)
    return Math.ceil(totalDuration / 900)
}

const answers = [answer1(), answer2(), answer3(), answer4(), answer5("15:00:00"), answer6()]
console.log(answers)