import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = ({ loading }) => {
  const override = {
    display: 'block',
    margin: '50px auto',
  };
  return (
    <ClipLoader
      color="green"
      loading={loading} 
      cssOverride={override}
      size={150}
    />
  );
};

export default Spinner;
