const url = 'https://sistema-2obim.vercel.app/fornecedores/';
// const url = 'http://localhost:4000/fornecedores/'

export async function gravar(fornecedor) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fornecedor)
    })
    return await res.json();
}

export async function deletar(fornecedor) {
    console.log(fornecedor)
    const res = await fetch(url + fornecedor.codigo, {
        method: 'DELETE'
    })
    return await res.json();
}

export async function atualizar(fornecedor) {
    const res = await fetch(url + fornecedor.codigo, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fornecedor)
    })
    return await res.json();
}

export async function consultar() {
    const res = await fetch(url, {
        method: 'GET',
    })
    return await res.json();
}   