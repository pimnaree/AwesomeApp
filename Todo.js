import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { List } from 'react-native-paper';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux'

function Todo({ id, title, complete }) {
    async function toggleComplete() {
        await firestore()
        .collection('todos')
        .doc(id)
        .update({
            complete: !complete,
        });
    }

    function deleteTodo(id) {
        Alert.alert(
            'Delete?', 
            'Do you want to delete this item?', 
            [
                {text: 'Cancel'},
                {
                    text: 'OK',
                    onPress: async () => {
                        await firestore()
                            .collection('todos')
                            .doc(id).delete()
                    }
                },
            ]
        )
    }
    function gotoAdd(id) {
      Actions.add({    //หน้า add
        id: id // พร้อบ
      })
    }

    function gotoEdit(id) {
      Actions.edit({    //หน้า edit 
        id: id // พร้อบ
      })
    }

  return (
    <List.Item
      title={title}
      onPress={() => gotoEdit(id)}
      onLongPress={() => deleteTodo(id)}
      left={props => (
        <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
      )}
    />
  );
}

export default React.memo(Todo);