import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultar, deletar, gravar, atualizar } from "../services/categoriaService";
import ESTADO from "./redux.estado";


export const consultarCategorias = createAsyncThunk('consultarCategorias', async () => {
    try {
        const resposta = await consultar();
        if (Array.isArray(resposta)) {
            return {
                status: true,
                listaCategorias: resposta
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem,
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem,
        };
    }
});


export const gravarCategoria = createAsyncThunk('gravarCategoria', async (categoria) => {
    try {
        const resposta = await gravar(categoria);
        if (resposta.status) {
            categoria.codigo = resposta.codigo;
            return {
                status: true,
                mensagem: resposta.mensagem,
                categoria
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
});


export const deletarCategoria = createAsyncThunk('deletarCategoria', async (categoria) => {
    try {
        const resposta = await deletar(categoria);
        console.log(resposta.mensagem)
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                categoria
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
});


export const atualizarCategoria = createAsyncThunk('atualizarCategoria', async (categoria) => {
    try {
        const resposta = await atualizar(categoria);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                categoria
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
});

const categoriaReducer = createSlice({
    name: 'categoria',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaCategorias: []
    },
    reducers: {
        zerarMensagem: (state) => {
            state.mensagem = "";
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(consultarCategorias.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
            })
            .addCase(consultarCategorias.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = "";
                state.listaCategorias = action.payload.listaCategorias;
            })
            .addCase(consultarCategorias.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })



            .addCase(gravarCategoria.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
            })
            .addCase(gravarCategoria.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaCategorias.push(action.payload.categoria);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(gravarCategoria.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })



            .addCase(deletarCategoria.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
            })
            .addCase(deletarCategoria.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaCategorias = state.listaCategorias.filter((categoria) => categoria.codigo !== action.payload.categoria.codigo);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(deletarCategoria.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })


            .addCase(atualizarCategoria.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
            })
            .addCase(atualizarCategoria.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const indice = state.listaCategorias.findIndex((categoria) => categoria.codigo === action.payload.categoria.codigo);
                    if (indice !== -1) {
                        state.listaCategorias[indice] = action.payload.categoria;
                    }
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarCategoria.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            });
    }
});

export const { zerarMensagem } = categoriaReducer.actions;
export default categoriaReducer.reducer;