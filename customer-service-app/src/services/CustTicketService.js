import Client from './api/Client'

const KEYS = {
    employees: 'employees',
    employeeId: 'employeeId',
    tickets:'tickets'
}


export const getProductCollection = () => ([
    { id: '1', title: 'Monitor' },
    { id: '2', title: 'Keyboards and mice' },
    { id: '3', title: 'Motherboards' },
    { id: '4', title: 'Printers' },
    { id: '5', title: 'Scanners' },
    { id: '6', title: 'Microphone' },
    { id: '7', title: 'Webcam' },
    { id: '8', title: 'Speakers' },
    { id: '9', title: 'DVD Drives' },
    { id: '10', title: 'Adapters and Chargers' },
    { id: '11', title: 'Processors' },
    { id: '12', title: 'Controllers' },
])

export const getStatusCollection = () => ([
    { id: 'Open', title:'Open'},
    { id: 'Closed', title:'Closed'},
])

export const getPriorityCollection = () => ([
    { id: '1', title:'Critical'},
    { id: '2', title:'Important'},
    { id: '3', title:'Normal'},
    { id: '4', title:'Low'},
])


export function insertTicket(data) {
    let employees = getAllTickets();
    data['id'] = generateTicketId()
    employees.push(data)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export function updateTicket(data) {
    let employees = getAllTickets();
    let recordIndex = employees.findIndex(x => x.id == data.id);
    employees[recordIndex] = { ...data }
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function deleteTicket(id) {
    let employees = getAllTickets();
    employees = employees.filter(x => x.id != id)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function generateTicketId() {
    if (localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId, (++id).toString())
    return id;
}

export function getAllTickets() {
    if (localStorage.getItem(KEYS.employees) == null)
        localStorage.setItem(KEYS.employees, JSON.stringify([]))
    
    let employees = JSON.parse(localStorage.getItem(KEYS.employees));
   
    console.log("These are the employees",employees);
    //map departmentID to department title
    let products = getProductCollection();
    let statuses = getStatusCollection();
    let priorities = getPriorityCollection();
    return employees.map(x => ({
        ...x,
        product: products[x.productId - 1].title,
        status: statuses[x.statusId-1].title,       

    }))
}

export function getCustomerTickets() {
    let employees = [];
    console.log(employees);
    Client.get("/api/CustomerTickets").then(res=>{
        let tickets = res.data;
        employees=tickets
        console.log(tickets);
    })
    //map departmentID to department title
    let products = getProductCollection();
    let statuses = getStatusCollection();
    let priorities = getPriorityCollection();
    return employees.map(x => ({
        ...x,
        product: products[x.productId - 1].title,
        status: statuses[x.statusId-1].title,       

    }))
    
}