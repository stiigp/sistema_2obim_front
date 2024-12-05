const url = 'https://sistema-2obim.vercel.app/clientes/';
// const url = 'http://localhost:4000/clientes/'

export async function gravar(cliente) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    })
    return await res.json();
}

export async function deletar(cliente) {
    const res = await fetch(url + cliente.codigo, {
        method: 'DELETE'
    })
    return await res.json();
}

export async function atualizar(cliente) {
    const res = await fetch(url + cliente.codigo, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    })
    return await res.json();
}

export async function consultar() {
    const res = await fetch(url, {
        method: 'GET',
    })
    return await res.json();
}   