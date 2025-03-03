
import { InjuryForm } from '@/components/InjuryForm';
import { Layout } from '@/components/Layout';

const ReportInjury = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 page-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Report an Injured Pet</h1>
            <p className="text-muted-foreground">
              Help us rescue an injured animal by providing its photo and location.
            </p>
          </div>
          
          <InjuryForm />
          
          <div className="mt-8 p-4 bg-muted/50 rounded-lg text-sm">
            <h4 className="font-medium mb-2">What happens next?</h4>
            <ol className="list-decimal pl-4 space-y-2 text-muted-foreground">
              <li>Your report is sent to all nearby animal rescue shelters in Visakhapatnam.</li>
              <li>The nearest available rescue team will be dispatched to the location.</li>
              <li>You'll receive a confirmation message with the estimated response time.</li>
              <li>The rescue team will contact you when they're on their way.</li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportInjury;
