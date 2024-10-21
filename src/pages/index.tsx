import { GetServerSideProps } from 'next';
import Cookies from 'cookies';
import LogoutButton from '../components/LogoutButton'; // Asegúrate de crear este componente

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const cookies = new Cookies(req, res);
  const token = cookies.get('token');

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user: token },
  };
};

const MainPage = ({ user }: { user: string }) => {
  return (
    <div>
      <h1>Bienvenido, {user}</h1>
      <LogoutButton />
      {/* Aquí puedes añadir más contenido o módulos */}
    </div>
  );
};

export default MainPage;
