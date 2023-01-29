import { RotatingLines } from 'react-loader-spinner';

const Loader = ({ loading }) => {
  return (
    <RotatingLines
      visible={loading}
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
    />
  );
};

export default Loader;
