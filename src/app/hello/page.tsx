const Hello = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return ( <div>HELLLOOOOO</div> );
}
 
export default Hello;