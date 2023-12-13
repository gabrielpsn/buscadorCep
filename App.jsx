import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native"
import Api from "./src/services/api"

export default function App () {
    const [cep, setCep] = useState("")
    const [logradouro, setLogradouro] = useState("")
    const [bairro, setBeirro] = useState("")
    const [localidade, setLocalidade] = useState("")
    const [uf, setUf] = useState("")

    async function handleCep () {
        if(cep === "") {
          Alert.alert("Cep Invalido")
          setCep("")
          return
        }

        try {
          const response =  await Api.get(`${cep}/json/`)
          console.log('res', response.data)
          setLogradouro(response.data.logradouro)
          setBeirro(response.data.bairro)
          setLocalidade(response.data.localidade)
          setUf(response.data.uf)
        } catch (error) {
          console.error(error)
        }
    }

    return (
        <View etyle={styles.containerPrincipal}>
            <View style={styles.topoBar}>
                <Text style={styles.title}>Buscardor de CEP</Text>
            </View>
            <View style={styles.containerCep}>
                <TextInput
                  style={{
                    borderColor: "#000000",
                    borderWidth: 2,
                    width: 200,
                    fontSize: 18,
                    marginTop: 30,
                    marginEnd: 20,
                    borderRadius: 10,
                    padding: 15,
                  }}
                  value={cep}
                  onChangeText={(texto) => setCep(texto)}
                  placeholder="CEP"
                />
                <TouchableOpacity style={styles.butaoBuscar} onPress={handleCep}>
                  <Text style={styles.textoBotaoBuscar}>Buscar</Text>
                </TouchableOpacity>
            </View>

            <TextInput
              style={styles.caixaTexto}
              value={logradouro}
              onChangeText={(texto) => setLogradouro(texto)}
              placeholder="Logradouro"
            />

            <TextInput
              style={styles.caixaTexto}
              value={bairro}
              onChangeText={(texto) => setBeirro(texto)}
              placeholder="Bairro"
            />

          <TextInput
              style={styles.caixaTexto}
              value={localidade}
              onChangeText={(texto) => setLocalidade(texto)}
              placeholder="Cidade"
            />

          <TextInput
               style={styles.caixaTexto}
              value={uf}
              onChangeText={(texto) => setUf(texto)}
              placeholder="UF"
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        flexDirection: "column",
    },
    topoBar: {
        flexDirection: "row",
        height: 70,
        backgroundColor: "#018786"
    },
    title: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "center",
        margin: 20
    },
    containerCep: {
      flexDirection: "row",
      height: 100,
      marginHorizontal: 20
    },
    butaoBuscar: {
      backgroundColor: "#018786",
      width: 120,
      height: 70,
      marginTop: 30,
      marginEnd: 20,
      borderRadius: 10,
      padding: 20
    },
    textoBotaoBuscar: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      alignSelf: "center",
    },
    caixaTexto: {
      borderColor: "#000000",
      borderWidth: 2,
      padding: 15,
      fontSize: 18,
      borderRadius: 10,
      marginTop: 20,
      marginHorizontal: 20
    }
})