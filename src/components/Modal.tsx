import { useNavigation } from '@react-navigation/native';
import { Button, FormControl, Input, Modal, useToast } from 'native-base';
import { useState } from 'react';
import { LatLng } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import {
  addWorkingArea,
  updatCurrentWorkingArea,
  updateWorkingArea,
} from '../redux/slices/workingAreaSlice';
import { AppDispatch } from '../redux/store';
import { AreaStatus, WorkingArea } from '../types';

interface ModalFromProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  coordinates: LatLng[];
  areaInfo?: WorkingArea;
  update?: boolean;
}

const ModalForm = ({
  showModal,
  setShowModal,
  coordinates,
  areaInfo,
  update,
}: ModalFromProps) => {
  const [formData, setFormData] = useState({
    name: areaInfo?.name,
    description: areaInfo?.description,
  });
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const navigation = useNavigation();

  return (
    <Modal isOpen={showModal}>
      <Modal.Content maxWidth="400px">
        <Modal.Header>Save working area</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              value={formData.name}
              onChangeText={(value) =>
                setFormData((prev) => ({ ...prev, name: value }))
              }
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Description</FormControl.Label>
            <Input
              value={formData.description}
              onChangeText={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
              }}
              _text={{ color: 'orange.500' }}
            >
              Cancel
            </Button>
            <Button
              _text={{ fontWeight: 600 }}
              backgroundColor="green.600"
              onPress={() => {
                setShowModal(false);
                update
                  ? (dispatch(
                      updateWorkingArea({
                        id: areaInfo?.id,
                        info: { ...formData, status: areaInfo?.status },
                      })
                    ),
                    dispatch(updatCurrentWorkingArea({ ...formData })),
                    toast.show({
                      title: 'Area information has been updated',
                      placement: 'bottom',
                    }))
                  : (dispatch(
                      addWorkingArea({
                        ...formData,
                        coordinates,
                        status: AreaStatus.Ungraveled,
                      })
                    ),
                    toast.show({
                      title: 'Selected area has been saved!',
                      placement: 'bottom',
                    }),
                    navigation.goBack());
              }}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalForm;
