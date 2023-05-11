import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Card } from '@material-ui/core';
import Swal from 'sweetalert2';

import RichTextEditor from '../../../../matx/components/RichTextEditor';
import { getSnk, saveSnk } from '../../../redux/actions/Settings';

const SnK = () => {
  const dispatch = useDispatch();
  const { dataSnk } = useSelector((state) => state.snk);

  const [syaratKetentuan, setSyaratKetentuan] = React.useState('');

  const getData = () => {
    dispatch(getSnk());
  };

  React.useLayoutEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    if (dataSnk !== []) {
      setSyaratKetentuan(dataSnk.syarat_ketentuan);
    }
  }, [dataSnk]);

  const handleChange = (e) => {
    setSyaratKetentuan(e);
  };

  const handleSubmit = () => {
    try {
      saveSnk({ syarat_ketentuan: syaratKetentuan }).then((res) => {
        Swal.fire(
          'Success!',
          'Data Syarat & Ketentuan berhasil disimpan',
          'success'
        );
        getData();
      });
    } catch (e) {
      Swal.fire('Oopss!', 'Data Syarat & Ketentuan gagal disimpan', 'error');
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
          <h1 className="fw-600 text-25 text-black">Terms & Condition</h1>
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
                  Syarat & Ketentuan
                </h3>
                <RichTextEditor
                  content={syaratKetentuan || ''}
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

export default SnK;
