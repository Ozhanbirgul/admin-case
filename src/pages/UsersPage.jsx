import { useGetUsersQuery } from "../services/api";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function UsersPage() {
  const { data, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error("Kullanıcı verileri alınamadı!");
    return <p className="text-red-500 text-center mt-6">Bir hata oluştu!</p>;
  }

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-6 text-[rgb(var(--color-text))]">Kullanıcılar</h1>

      <table className="min-w-full bg-[rgb(var(--color-surface))] shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Ad</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Rol</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-3 px-6 text-[rgb(var(--color-text))]">{user.id}</td>
              <td className="py-3 px-6 text-[rgb(var(--color-text))]">{user.name}</td>
              <td className="py-3 px-6 text-[rgb(var(--color-text))]">{user.email}</td>
              <td className="py-3 px-6 text-[rgb(var(--color-text))]">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;