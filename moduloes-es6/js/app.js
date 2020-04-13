import { nombreCliente, ahorro, mostrarInformacion, Cliente } from './cliente.js'
import { nombreEmpresa, ahorro as ahorroEmpresa, categoria, mostrarInformacion as mostrarInformacionEmpresa, Empresa } from './empresa.js'

//import * as cliente from './cliente.js'
//console.log(cliente)

console.log(nombreCliente);
console.log(ahorro)

console.log(nombreEmpresa);
console.log(ahorroEmpresa)
console.log(categoria)

const info = mostrarInformacion(nombreCliente, ahorro);
console.log(info)

const infoEmpresa = mostrarInformacionEmpresa(nombreEmpresa, ahorroEmpresa, categoria);
console.log(infoEmpresa)

//Utilizar la clase
const cli = new Cliente(nombreCliente, ahorro);
console.log(cli.mostrarInformacion())

const emp = new Empresa(nombreEmpresa, ahorroEmpresa, categoria);
console.log(emp.mostrarInformacion())