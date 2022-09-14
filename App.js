import React, { useState} from 'react'
import { Button, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Modal } from 'react-native';
import { AddTask, CustomModal  } from './components/index';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  
  const onHandleChangeText = (text) => {
    setTask(text);
  }
  const addItem = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), value: task },
    ]);
    
    setTask('');
  }
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{item.value}</Text>
      <TouchableOpacity onPress={() => onHandleModal(item.id)}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
    </View>
  )
const onHandleDeleteItem = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
    setSelectedTask(null);
    setModalVisible(!modalVisible);
  } 
  const onHandleModal = (id) => {
    setModalVisible(!modalVisible);
    setSelectedTask(tasks.find((item) => item.id === id))
    console.warn(id);
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Lista de Compras</Text>
      <View style={styles.buttonContainer}>
      
      <AddTask
      placeholder='new item' 
      style={styles.input} 
      onChangeText={onHandleChangeText}
      value={task}
      textButton='ADD'
      addItem={addItem}
      item={task}
      />
      {/* <Button title='Add'
      onPress={addItem}/> */}
      </View>
      <FlatList
        style={styles.itemList}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
       <CustomModal animationType='slide' visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Elemento a eliminar</Text>
        </View>
        <View style={styles.modalMessageContainer}> 
          <Text style={styles.modalMessage}>¿Estas seguro que querés eliminar?</Text>
        </View>
        <View style={styles.modalMessageContainer}> 
          <Text style={styles.selectedTask}>{selectedTask?.value}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            title='Eliminar'
            onPress={() => onHandleDeleteItem(selectedTask?.id)}
            color='#FF33C1' 
          />
          <Button 
            title='Cancelar'
            onPress={() => setModalVisible(!modalVisible)}
            color='#cccccc'
          />
        </View>
      </CustomModal>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
      
  },
  titulo: {
    marginHorizontal:20,
    marginTop:60,
   
  },
  buttonContainer: {
    marginTop:20,    
    marginHorizontal:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  input: {
    
    
  },
  itemList: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  itemContainer: {
    flex: 1,
    marginVertical: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: '#FF33C1',
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    
  },
  item: {
    fontSize: 16,
   
  },
  delete: {
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  modalContainer: {
    marginTop:5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 16
  },
  modalMessageContainer : {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalMessage: {
    fontSize: 14,
  },
  selectedTask: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  
});
