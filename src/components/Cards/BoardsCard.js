import { Link } from 'react-router-dom';
import AppModal from '../AppModal';
import DeleteBoardBtn from '../Forms/deleteBoard';

export default function BoardsCard({ board, redrawDom }) {
  return (
    <div className="card m-2">
      <img className="card-img-top" src={board.imageUrl} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">{board.name}</h5>
        <p className="card-text">{board.description}</p>
        <div className="create-delete-btns">
          <Link className="btn btn-primary" to={`/boards/${board.firebaseKey}`}>
            View Pins
          </Link>
          <AppModal title={'Delete Board'} buttonLabel={'Delete Board'}>
            This action is undoable. Delete?
            <DeleteBoardBtn board={board} redrawDom={redrawDom} />
          </AppModal>
        </div>
      </div>
    </div>
  );
}
