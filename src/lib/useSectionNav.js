import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToId } from './smoothScroll';

// Section anchors live on the Home route. From any other route (e.g. /blog),
// navigate home first and pass the target id so Home scrolls once it mounts.
export function useSectionNav() {
  const navigate = useNavigate();
  const location = useLocation();
  return (id) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      scrollToId(id);
    }
  };
}
