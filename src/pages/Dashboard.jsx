import ServiceNavbar from '../components/ServiceNavbar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <ServiceNavbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Dashboard content */}
      </main>
    </div>
  );
};

export default Dashboard;