//TerminateButton component
import DeleteIcon from '@mui/icons-material/Delete';
// Import icons from Material UI
import '../styles/TerminateButton.css';

const TerminateButton = ({ onTerminate }) => {
  return (
    <button 
      className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors" 
      onClick={onTerminate} 
      title="Terminate Account"
    >
      <DeleteIcon size={24} /> 
      Terminate Account
    </button>
  );
};

export default TerminateButton;