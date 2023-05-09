import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Card } from '@material-ui/core';
import Swal from 'sweetalert2';

import RichTextEditor from '../../../../matx/components/RichTextEditor';
import {
  getPrivacyPolicy,
  savePrivacyPolicy,
} from '../../../redux/actions/Settings';

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const { dataPrivacyPolicy } = useSelector((state) => state.privacyPolicy);
  const [privacyPolicy, setPrivacyPolicy] = React.useState('');

  const getData = () => {
    dispatch(getPrivacyPolicy());
  };

  React.useLayoutEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    if (dataPrivacyPolicy !== []) {
      setPrivacyPolicy(dataPrivacyPolicy.privacy_policy);
    }
  }, [dataPrivacyPolicy]);

  const handleChange = (e) => {
    setPrivacyPolicy(e);
  };

  const handleSubmit = () => {
    try {
      savePrivacyPolicy({ privacy_policy: privacyPolicy }).then((res) => {
        Swal.fire(
          'Success!',
          'Data Kebijakan Privasi berhasil disimpan',
          'success'
        );
        getData();
      });
    } catch (e) {
      Swal.fire('Oopss!', 'Data Kebijakan Privasi gagal disimpan', 'error');
    }
  };

  return (
    <div className="m-sm-30">
      <Grid
        container
        spacing={3}
        className="my-8 mx-auto px-2"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm>
          <h1 className="fw-600 text-25 text-black">Privacy Policy</h1>
        </Grid>
        <Grid item xs={12} sm className="d-flex mr-4 justify-end">
          <Button
            variant="contained"
            color="primary"
            className="px-15 py-3 text-white fw-500 border-radius-4"
            onClick={handleSubmit}
          >
            <span className="">Save</span>
          </Button>
        </Grid>
      </Grid>
      <div className="my-8">
        <Card className="py-8 bg-white">
          <div className="mx-8 px-10 mb-8 bg-white">
            <Grid
              container
              spacing={5}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                <h3 className="mb-5 fw-500 text-15 text-black">
                  Kebijakan Privasi
                </h3>
                <RichTextEditor
                  content={privacyPolicy || ''}
                  placeholder=""
                  handleContentChange={handleChange}
                />
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
