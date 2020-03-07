import React, { useEffect, useState } from "react";

import UserList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { IUser } from "../components/UserList.interface";
import { useHttp } from "../../shared/hooks/http-hook";

const Users: React.FC<{}> = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const { isLoading, error, clearError, send } = useHttp();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const data = await send({
          url: `${process.env.REACT_APP_BACKEND_API}/users`
        });
        setUsers(data.users);
      } catch (e) {}
    };
    sendRequest();
  }, [send]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <UserList items={users} />{" "}
    </React.Fragment>
  );
};
export default Users;
