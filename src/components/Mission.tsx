import missionImage from '@/assets/mission.jpg';

const Mission = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div 
              className="rounded-xl sm:rounded-2xl overflow-hidden"
              style={{ boxShadow: 'var(--shadow-conference)' }}
            >
              <img 
                src={missionImage} 
                alt="Inspiring mission concept representing connection and growth"
                className="w-full h-[250px] sm:h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            
            {/* Mission Badge - Responsive sizing */}
            <div className="absolute -top-3 sm:-top-6 -right-3 sm:-right-6 bg-primary text-primary-foreground rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 sm:mb-6">
              Our Mission
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 text-center lg:text-left">
              Empowering Knowledge Exchange 
              <span className="text-secondary"> Across All Disciplines</span>
            </h2>
            
            <div className="space-y-4 sm:space-y-4 text-base sm:text-lg text-muted-foreground text-center lg:text-left">
              <p className="text-lg sm:text-base leading-relaxed">
                To democratize access to world-class knowledge by creating an inclusive platform 
                where businesses and communities can connect, collaborate, and catalyse 
                breakthrough innovations that benefit humanity.
              </p>
              
              <p>
                We're committed to breaking down silos between industries and academic disciplines, 
                fostering an environment where diverse perspectives converge to solve the world's 
                most pressing challenges.
              </p>
            </div>
            
            {/* Mission Points - Mobile optimized */}
            <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">Bridge Knowledge Gaps</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">Connect expertise across disciplines for comprehensive solutions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">Accelerate Innovation</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">Transform ideas into actionable solutions through collaboration</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">Cultivate Communities</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">Build lasting professional networks that drive continuous growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;