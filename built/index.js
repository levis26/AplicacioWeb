"use strict";
// Objeto literal del restaurante
const restaurante = {
    nombre: "La Receta de la Abuela",
    ubicacion: "Calle Puig 123",
    platos: [
        { nombre: "Paella", precio: 12 },
        { nombre: "Gazpacho", precio: 6 },
        { nombre: "Tortilla Española", precio: 8 },
    ],
};
// Clase Cliente
class Cliente {
    constructor(nombre, apellidos, dni, tarjetaCredito) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.tarjetaCredito = tarjetaCredito;
    }
    getNombre() {
        return this.nombre;
    }
    getApellidos() {
        return this.apellidos;
    }
    getDNI() {
        return this.dni;
    }
    getTarjeta() {
        return this.tarjetaCredito;
    }
}
// Colecciones para almacenar clientes y pedidos
const clientes = new Map();
const pedidos = [];
// Función para mostrar el menú
function mostrarMenu() {
    const menuInfo = document.getElementById("menu-info");
    menuInfo.innerHTML = `
        <h3>${restaurante.nombre}</h3>
        <p><strong>Ubicación:</strong> ${restaurante.ubicacion}</p>
        <h4>Menú:</h4>
        <ul>
            ${restaurante.platos.map(plato => `<li>${plato.nombre} - ${plato.precio}€</li>`).join('')}
        </ul>
    `;
}
// Función para agregar un plato
function agregarPlato(event) {
    event.preventDefault();
    const nombrePlato = document.getElementById("nombre-plato").value;
    const precioPlato = parseFloat(document.getElementById("precio-plato").value);
    if (nombrePlato && !isNaN(precioPlato)) {
        restaurante.platos.push({ nombre: nombrePlato, precio: precioPlato });
        mostrarMenu();
        alert(`Plato "${nombrePlato}" agregado.`);
    }
}
// Función para agregar un cliente
function agregarCliente(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const dni = document.getElementById("dni").value;
    const tarjeta = document.getElementById("tarjeta").value;
    if (nombre && apellidos && dni && tarjeta) {
        if (!clientes.has(dni)) {
            clientes.set(dni, new Cliente(nombre, apellidos, dni, tarjeta));
            alert(`Cliente ${nombre} ${apellidos} agregado.`);
        }
        else {
            alert("El DNI ya está registrado.");
        }
    }
}
// Función para agregar un pedido
function agregarPedido(event) {
    event.preventDefault();
    const dniCliente = document.getElementById("pedido-cliente").value;
    const plato = document.getElementById("pedido-plato").value;
    if (clientes.has(dniCliente) && plato) {
        pedidos.push({ dniCliente, plato });
        alert(`Pedido agregado para el cliente con DNI: ${dniCliente}`);
    }
    else {
        alert("DNI del cliente no encontrado o plato no especificado.");
    }
}
// Función para mostrar la tabla de clientes
function mostrarClientes() {
    const contenedor = document.getElementById("mostrar-tabla-tema");
    contenedor.innerHTML = "<h3>Clientes Registrados:</h3>";
    if (clientes.size === 0) {
        contenedor.innerHTML += "<p>No hay clientes registrados.</p>";
    }
    else {
        let tablaHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Tarjeta de Crédito</th>
                    </tr>
                </thead>
                <tbody>
                    ${Array.from(clientes.values())
            .map(cliente => `
                            <tr>
                                <td>${cliente.nombre}</td>
                                <td>${cliente.apellidos}</td>
                                <td>${cliente.getDNI()}</td>
                                <td>${cliente.getTarjeta()}</td>
                            </tr>
                        `).join('')}
                </tbody>
            </table>
        `;
        contenedor.innerHTML += tablaHTML;
    }
}
// Función para mostrar la tabla de pedidos
function mostrarPedidos() {
    const contenedor = document.getElementById("mostrar-tabla-tema");
    contenedor.innerHTML = "<h3>Pedidos Realizados:</h3>";
    if (pedidos.length === 0) {
        contenedor.innerHTML += "<p>No hay pedidos registrados.</p>";
    }
    else {
        let tablaHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Nombre del Cliente</th>
                        <th>DNI</th>
                        <th>Plato</th>
                    </tr>
                </thead>
                <tbody>
                    ${pedidos.map(pedido => {
            const cliente = clientes.get(pedido.dniCliente);
            return cliente
                ? `
                                <tr>
                                    <td>${cliente.nombre} ${cliente.apellidos}</td>
                                    <td>${cliente.getDNI()}</td>
                                    <td>${pedido.plato}</td>
                                </tr>
                            `
                : `
                                <tr>
                                    <td>Cliente no encontrado</td>
                                    <td>${pedido.dniCliente}</td>
                                    <td>${pedido.plato}</td>
                                </tr>
                            `;
        }).join('')}
                </tbody>
            </table>
        `;
        contenedor.innerHTML += tablaHTML;
    }
}
// Eventos al cargar la ventana
window.onload = () => {
    mostrarMenu();
    // Evento para agregar plato
    document.getElementById("form-plato").addEventListener("submit", agregarPlato);
    // Evento para agregar cliente
    document.getElementById("form-cliente").addEventListener("submit", agregarCliente);
    // Evento para agregar pedido
    document.getElementById("form-pedido").addEventListener("submit", agregarPedido);
    // Evento para mostrar clientes
    document.getElementById("toggle-tema:clientes-btn").addEventListener("click", mostrarClientes);
    // Evento para mostrar pedidos
    document.getElementById("toggle-tema:pedidos-btn").addEventListener("click", mostrarPedidos);
};