module.exports = {
  apps: [
    {
      name: 'team-1-genics-2024-be',               
      script: 'node dist/index.js',        
      instances: '1',          
      env: {
        NODE_ENV: 'development', 
      },
      env_production: {
        NODE_ENV: 'production',  
      }
    }
  ]
};