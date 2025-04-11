import Sidebar from '@/components/Sidebar';
import PropTypes from 'prop-types';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-grow w-full p-6">
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
