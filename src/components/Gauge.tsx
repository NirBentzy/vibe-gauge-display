import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface GaugeProps {
  value: number;
  label: string;
  unit?: string;
  min?: number;
  max?: number;
  delay?: number;
}

export const Gauge = ({ 
  value, 
  label, 
  unit = "%", 
  min = 0, 
  max = 100,
  delay = 0 
}: GaugeProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      let current = 0;
      const increment = value / 60;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setAnimatedValue(value);
          clearInterval(interval);
        } else {
          setAnimatedValue(Math.floor(current));
        }
      }, 25);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const percentage = ((value - min) / (max - min)) * 100;
  const rotation = -90 + (percentage / 100) * 180;
  
  const getColor = (percent: number) => {
    if (percent < 33) return "hsl(var(--gauge-green))";
    if (percent < 66) return "hsl(var(--gauge-yellow))";
    return "hsl(var(--gauge-red))";
  };

  const currentColor = getColor(percentage);

  return (
    <Card 
      className="p-6 bg-card border-border backdrop-blur-sm transition-all duration-500 hover:shadow-[var(--shadow-glow)]"
      style={{ 
        animationDelay: `${delay}ms`,
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out"
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            <defs>
              <linearGradient id={`gauge-gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--gauge-green))" />
                <stop offset="50%" stopColor="hsl(var(--gauge-yellow))" />
                <stop offset="100%" stopColor="hsl(var(--gauge-red))" />
              </linearGradient>
            </defs>
            
            {/* Background arc */}
            <path
              d="M 30 100 A 70 70 0 0 1 170 100"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="20"
              strokeLinecap="round"
            />
            
            {/* Gradient arc */}
            <path
              d="M 30 100 A 70 70 0 0 1 170 100"
              fill="none"
              stroke={`url(#gauge-gradient-${label})`}
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray="220"
              strokeDashoffset={220 - (220 * (animatedValue / max))}
              style={{
                transition: "stroke-dashoffset 0.5s ease-out"
              }}
            />
          </svg>
          
          {/* Center value display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold" style={{ color: currentColor }}>
              {animatedValue}
            </span>
            <span className="text-muted-foreground text-sm mt-1">{unit}</span>
          </div>
          
          {/* Needle */}
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-16 -mt-16 -ml-0.5 origin-bottom rounded-full"
            style={{
              background: currentColor,
              transform: `rotate(${rotation}deg)`,
              transition: "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: `0 0 10px ${currentColor}`
            }}
          >
            <div 
              className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 -mt-1 rounded-full"
              style={{ background: currentColor }}
            />
          </div>
          
          {/* Center dot */}
          <div 
            className="absolute top-1/2 left-1/2 w-4 h-4 -ml-2 -mt-2 rounded-full border-4"
            style={{ 
              borderColor: currentColor,
              background: "hsl(var(--card))"
            }}
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground">{label}</h3>
        </div>
      </div>
    </Card>
  );
};
