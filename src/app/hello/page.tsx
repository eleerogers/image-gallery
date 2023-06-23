const hello = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return ( <div>HELLLOOOOO</div> );
}
 
export default hello;