import { axiosInstance } from './_libs/axios.config';
import { TUser } from './_models/user.model';

export default async function Home() {
  const res = await axiosInstance().get('/users');
  const { data }: { data: TUser[] } = res.data;
  return (
    <>
      <div className="text-red-500 bg-slate-700">Hello world</div>
      <div>
        {data.map((e: TUser) => (
          <div key={e.id}>{e.fullname}</div>
        ))}
      </div>
    </>
  );
}
