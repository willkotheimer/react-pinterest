export default function SingleBoard(props) {
  const boardFirebaseKey = props.match.params.id;
  console.warn(boardFirebaseKey);
  return (
    <div class="card">
      <h1>Single board</h1>
    </div>
  );
}
