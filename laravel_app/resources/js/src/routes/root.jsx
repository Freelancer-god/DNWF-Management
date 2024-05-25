import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden
            />
            <div
              className="sr-only"
              aria-live="polite"
            />
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>

              <Link to="/apps/invoices/contacts/1">Contact 1</Link>
            </li>
            <li>
              <Link to="/apps/invoices/contacts/2">Contact 2</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail" />
      {createPortal(
        <nav>
          <ul>
            <li>
              <Link to="/apps/invoices/contacts/1">Contact 1</Link>
            </li>
            <li>
              <Link to="/apps/invoices/contacts/2">Contact 2</Link>
            </li>
          </ul>
        </nav>,
        document.getElementById('appnavigation'),
      )}
    </>
  );
}
