const Navbar = () => {
  return (
    <div className="navbar bg-base-100 mb-3">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          <img src="/shell.svg" alt="Shell" width={50} />
        </a>
        <ul className="menu menu-horizontal px-1 font-bold">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>History</a>
          </li>
          <li>
            <a>Help</a>
          </li>
        </ul>
      </div>
      <div className="flex-none">
        <div className={`dropdown dropdown-end`}>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="w-10 rounded-full">
              <img
                alt="Shell Bot"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
