export function useUserData() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);
  return userData;
}
