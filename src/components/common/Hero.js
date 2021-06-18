import heroImg from '../../assets/images/hero-image.jpg'

function Hero() {
  return (
    <>
    <section className="hero-section">
      <div className="image-section">
      <img src={heroImg} alt="hero" className="hero-img" />
      </div>
      <div className="overlay-section"></div>
      <div className="text-section">
          <p>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
          took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
          but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s 
          with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        
      </div>
    </section>
    
    </>
  )
}

export default Hero