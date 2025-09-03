import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { healthCheck, createRegistration, submitAbstract } from '../lib/firebaseService';

const FirebaseTest: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<string>('Not tested');
  const [testResult, setTestResult] = useState<string>('Not tested');
  const [isLoading, setIsLoading] = useState(false);

  const testHealthCheck = async () => {
    setIsLoading(true);
    try {
      console.log('Testing Firebase health check...');
      const result = await healthCheck();
      console.log('Health check result:', result);
      setHealthStatus(`✅ Success: ${(result as any).message}`);
    } catch (error) {
      console.error('Health check error details:', error);
      setHealthStatus(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testRegistration = async () => {
    setIsLoading(true);
    try {
      const testData = {
        userId: 'test-user',
        conferenceId: 'test-conference',
        registrationType: 'SPEAKER (IN PERSON)',
        personalInfo: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          phone: '+1234567890',
          organization: 'Test University',
          designation: 'Test Designation',
          country: 'Test Country',
          city: 'Test City',
          address: '123 Test St',
          postalCode: '12345'
        },
        status: 'test'
      };

      const result = await createRegistration(testData);
      setTestResult(`✅ Registration created: ${result.registrationId}`);
    } catch (error) {
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔥 Firebase Integration Test
            <Badge variant="secondary">Development</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Health Check Test</h3>
            <div className="flex items-center gap-2">
              <Button 
                onClick={testHealthCheck} 
                disabled={isLoading}
                variant="outline"
              >
                Test Health Check
              </Button>
              <span className="text-sm text-gray-600">{healthStatus}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                onClick={async () => {
                  try {
                    console.log('Direct fetch test...');
                    const response = await fetch('http://localhost:5001/the-atom-conferences/us-central1/healthCheck');
                    const data = await response.json();
                    console.log('Direct fetch result:', data);
                    setHealthStatus(`✅ Direct Success: ${data.message}`);
                  } catch (error) {
                    console.error('Direct fetch error:', error);
                    setHealthStatus(`❌ Direct Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                  }
                }}
                variant="outline"
                size="sm"
              >
                Direct Test
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Registration Test</h3>
            <div className="flex items-center gap-2">
              <Button 
                onClick={testRegistration} 
                disabled={isLoading}
                variant="outline"
              >
                Test Registration
              </Button>
              <span className="text-sm text-gray-600">{testResult}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">User Relationship Test</h3>
            <div className="flex items-center gap-2">
              <Button 
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    // Test the complete user relationship system
                    const testEmail = 'test@example.com';
                    
                    // First, submit an abstract
                    const abstractData = {
                      conferenceId: 'test-conference',
                      authorInfo: {
                        firstName: 'Test',
                        lastName: 'User',
                        email: testEmail,
                        phone: '+1234567890',
                        organization: 'Test University',
                        country: 'Test Country',
                        city: '',
                        address: 'Researcher',
                        postalCode: '5-10 years'
                      },
                      abstractTitle: 'Test Abstract Title',
                      abstractText: 'This is a test abstract for testing user relationships.',
                      keywords: ['test', 'abstract', 'relationship'],
                      status: 'pending'
                    } as any; // Type assertion for testing

                    const abstractResult = await submitAbstract(abstractData);
                    setTestResult(`✅ Abstract submitted: ${abstractResult.abstractId}`);
                    
                    // Then, register for conference
                    const registrationData = {
                      conferenceId: 'test-conference',
                      registrationType: 'SPEAKER (IN PERSON)',
                      personalInfo: {
                        firstName: 'Test',
                        lastName: 'User',
                        email: testEmail,
                        phone: '+1234567890',
                        organization: 'Test University',
                        country: 'Test Country',
                        city: '',
                        address: 'Test St',
                        postalCode: '12345'
                      },
                      status: 'pending'
                    } as any; // Type assertion for testing

                    const regResult = await createRegistration(registrationData);
                    setTestResult(`✅ Both submitted! Abstract: ${abstractResult.abstractId}, Registration: ${regResult.registrationId}`);
                    
                  } catch (error) {
                    setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                  } finally {
                    setIsLoading(false);
                  }
                }}
                disabled={isLoading}
                variant="outline"
              >
                Test User Relationships
              </Button>
              <span className="text-sm text-gray-600">Test abstract + registration linking</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">Emulator Status</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Functions: localhost:5001</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Firestore: localhost:8081</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Storage: localhost:9199</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>UI: localhost:4000</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">Next Steps</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• ✅ Firebase emulators running</li>
              <li>• ✅ Environment variables configured</li>
              <li>• ✅ Firebase connectivity tested</li>
              <li>• ✅ Registration page integrated</li>
              <li>• ✅ Abstract submission integrated</li>
              <li>• 🔄 Test payment functions</li>
            </ul>
            
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Ready to Test Firebase Integration!</h4>
              <p className="text-sm text-green-700 mb-3">
                Both registration and abstract submission are now connected to Firebase:
              </p>
              <div className="space-y-2">
                <a 
                  href="/registration" 
                  className="block w-full text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  🎯 Test Registration Page
                </a>
                <a 
                  href="/submit-abstract" 
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  📝 Test Abstract Submission
                </a>
                <a 
                  href="/registration?conference=forensicscience" 
                  className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  🔬 Test with Forensic Science Conference
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirebaseTest;
