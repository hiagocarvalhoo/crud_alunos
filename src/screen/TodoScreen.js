import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import Fallback from "../components/Fallback";

const TodoScreen = () => {
  const [name, setName] = useState("");
  const [registration, setRegistration] = useState("");
  const [shift, setShift] = useState("");
  const [course, setCourse] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [showAddFields, setShowAddFields] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleAddFields = () => {
    setShowAddFields(!showAddFields);
    setIsEditing(false);
  };

  const handleAddTodo = () => {
    if (name === "" || registration === "" || shift === "" || course === "") {
      return;
    }

    const newTodo = {
      id: Date.now().toString(),
      name,
      registration,
      shift,
      course,
    };

    setTodoList([...todoList, newTodo]);
    setName("");
    setRegistration("");
    setShift("");
    setCourse("");
  };

  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  const handleEditTodo = (todo) => {
    setEditedTodo(todo);
    setName(todo.name);
    setRegistration(todo.registration);
    setShift(todo.shift);
    setCourse(todo.course);
    setIsEditing(true);
    setShowAddFields(true);
  };

  const handleUpdateTodo = () => {
    if (editedTodo) {
      const updatedTodos = todoList.map((item) => {
        if (item.id === editedTodo.id) {
          return {
            ...item,
            name,
            registration,
            shift,
            course,
          };
        }
        return item;
      });
      setTodoList(updatedTodos);
      setEditedTodo(null);
      setName("");
      setRegistration("");
      setShift("");
      setCourse("");
      setIsEditing(false);
    }
  };

  const renderTodos = ({ item, index }) => {
	return (
	  <View
		style={{
		  backgroundColor: "#1e90ff",
		  borderRadius: 6,
		  paddingHorizontal: 6,
		  paddingVertical: 8,
		  marginBottom: 12,
		  flexDirection: "column",
		  alignItems: "center",
		  shadowColor: "#000",
		  shadowOffset: { width: 0, height: 2 },
		  shadowOpacity: 0.8,
		  shadowRadius: 3,
		}}
	  >
		<Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>
		  Nome: {item.name}
		</Text>
		<Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>
		  Matrícula: {item.registration}
		</Text>
		<Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>
		  Turno: {item.shift}
		</Text>
		<Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>
		  Curso: {item.course}
		</Text>
  
		<View style={{ flexDirection: "row", alignItems: "center" }}>
		  <IconButton
			icon="pencil"
			color="#fff"
			onPress={() => handleEditTodo(item)}
		  />
		  <IconButton
			icon="delete"
			color="#fff"
			onPress={() => handleDeleteTodo(item.id)}
		  />
		</View>
	  </View>
	);
  };
  

  return (
    <View style={{ marginHorizontal: 16, marginTop: 40 }}>
      <TouchableOpacity
        onPress={toggleAddFields}
        style={{
          marginBottom: 16,
          borderWidth: 2,
          borderColor: "#1e90ff",
          borderRadius: 6,
          padding: 10,
          alignItems: "center",
          flexDirection: "row", // Para adicionar um ícone ao lado do texto
          justifyContent: "center", // Para centralizar o texto e o ícone
        }}
      >
        <IconButton
          icon="plus" // Ícone de adição
          color="#1e90ff" // Cor do ícone
          size={24} // Tamanho do ícone
        />
      </TouchableOpacity>

      {showAddFields && (
        <>
          <TextInput
            style={{
              borderWidth: 2,
              borderColor: "#000",
              borderRadius: 6,
              paddingVertical: 8,
              paddingHorizontal: 16,
              marginBottom: 16,
            }}
            placeholder="Nome do aluno"
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <TextInput
            style={{
              borderWidth: 2,
              borderColor: "#000",
              borderRadius: 6,
              paddingVertical: 8,
              paddingHorizontal: 16,
              marginBottom: 16,
            }}
            placeholder="Matrícula"
            value={registration}
            onChangeText={(text) => setRegistration(text)}
          />

          <TextInput
            style={{
              borderWidth: 2,
              borderColor: "#000",
              borderRadius: 6,
              paddingVertical: 8,
              paddingHorizontal: 16,
              marginBottom: 16,
            }}
            placeholder="Turno"
            value={shift}
            onChangeText={(text) => setShift(text)}
          />

          <TextInput
            style={{
              borderWidth: 2,
              borderColor: "#000",
              borderRadius: 6,
              paddingVertical: 8,
              paddingHorizontal: 16,
              marginBottom: 16,
            }}
            placeholder="Curso"
            value={course}
            onChangeText={(text) => setCourse(text)}
          />

          {isEditing ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                borderRadius: 6,
                paddingVertical: 12,
                marginVertical: 34,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 3,
              }}
              onPress={() => handleUpdateTodo()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
                Editar
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                borderRadius: 6,
                paddingVertical: 12,
                marginVertical: 34,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 3,
              }}
              onPress={() => handleAddTodo()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
                Adicionar
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}

      <FlatList data={todoList} renderItem={renderTodos} />

      {todoList.length <= 0 && <Fallback />}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({});
