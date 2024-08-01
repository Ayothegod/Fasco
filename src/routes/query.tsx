import {
  useSearchParams,
  useParams,
  Form,
  ActionFunctionArgs,
  redirect,
  json,
  useLoaderData,
  LoaderFunctionArgs,
} from "react-router-dom";
import { Button } from "../components/ui/button";

export async function Action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const search = await formData.get("search");
  const age = await formData.get("age");

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  if (search) {
    searchParams.set("search", search.toString());
  }
  if (age) {
    searchParams.set("age", age.toString());
  }

  url.search = searchParams.toString();

  return redirect(url.toString());
}

export async function Loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    console.log(url);

    const searchParams = new URLSearchParams(url.search);
    const age = searchParams.get("age") || null;
    const search = searchParams.get("search") || null;
    // console.log(age, search);

    return json({ age: age, search: search });
  } catch (error) {
    return json({ error: "An error occured!" });
  }
}

export const Query = () => {
  const data: any = useLoaderData();
  console.log(data);

  // const [searchParams, setSearchParams] = useSearchParams();

  // const handleClick = () => {
  //   const currentSearchParams = new URLSearchParams(searchParams);
  //   currentSearchParams.set("age", "7530");
  //   setSearchParams(currentSearchParams);
  // };

  // const handleSearch = (e: any) => {
  //   const currentSearchParams = new URLSearchParams(searchParams);
  //   currentSearchParams.set("search", e.target.value);
  //   setSearchParams(currentSearchParams);
  // };

  // const handleChange = (event: any) => {
  //   const search = event.target.value;
  //   setSearchParams((prevParams) => {
  //     const newParams = new URLSearchParams(prevParams);
  //     newParams.set("search", search);
  //     return newParams;
  //   });
  // };

  return (
    <div className="min-h-[50vh]">
      {data?.age && <p>{data?.age}</p>}
      {data?.search && <p>{data?.search}</p>}

      <Form method="post">
        <input
          type="text"
          name="search"
          placeholder="Set URL parameter"
          className="border p-2 rounded-md"
        />
        <input type="number" name="age" placeholder="age here" className="border p-2 rounded-md"/>

      <Button type="submit">Set Age</Button>
      </Form>

    </div>
  );
};
