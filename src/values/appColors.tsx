
export interface AppColors {
  textPrimary: string;
  textSecondary: string;
  textContrast: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  borderColor: string;
  primaryColor: string;
  primaryDark: string;
  primaryLight: string;
  secondaryColor: string;
  secondaryDark: string;
  secondaryLight: string;
  errorColor: string;
  warningColor: string;
  successColor: string;
  buttonBackground: string;
  buttonText: string;
}

export const lightTheme: AppColors = {
  textPrimary: '#333333',     
  textSecondary: '#666666',   
  textContrast: '#FFFFFF',       

  backgroundPrimary: '#F8F8F8',   
  backgroundSecondary: '#FFFFFF', 
  borderColor: '#E0E0E0',          

  primaryColor: '#007BFF',
  primaryDark: '#0056B3',   
  primaryLight: '#CCE5FF',   

  secondaryColor: '#6C757D',       
  secondaryDark: '#545B62',
  secondaryLight: '#E2E6EA',

  errorColor: '#DC3545',      
  warningColor: '#FFC107',         
  successColor: '#28A745',       

  buttonBackground: '#007BFF',  
  buttonText: '#FFFFFF',          
};


export const darkTheme: AppColors = {
  textPrimary: '#E0E0E0', 
  textSecondary: '#AAAAAA',     
  textContrast: '#212121',      

  backgroundPrimary: '#212121',    
  backgroundSecondary: '#333333', 
  borderColor: '#424242',    

  primaryColor: '#66B3FF',      
  primaryDark: '#3385FF',   
  primaryLight: '#004085',

  secondaryColor: '#B0BEC5',   
  secondaryDark: '#808E95', 
  secondaryLight: '#455A64',  

  errorColor: '#EF5350', 
  warningColor: '#FFD740',        
  successColor: '#66BB6A',         

  buttonBackground: '#66B3FF', 
  buttonText: '#212121',          
};

export function applyTheme(theme: AppColors) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme)) {
    root.style.setProperty(`--color-${key}`, value);
  }
}