import {useNavigate} from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "20px", lineHeight: "1.6",alignItems: "center", textAlign: "left",paddingInline: "-20px"}}>
      <h1>Artist Membership Terms and Conditions</h1>
      <ol>
        <li>Registering with the sum of Sixty thousand five hundred naira (#60,500).</li>
        <li>We deal with applicants directly.</li>
        <li>We don’t deal with artists under any agent.</li>
        <li>We don’t deal with artists under any manager.</li>
        <li>We don’t deal with any artist under any company/industry/record label.</li>
        <li>If the information you have given is found to be false, you will be disqualified and also made to face the law.</li>
        <li>Artists must be of good moral character and possess a pleasant personality.</li>
        <li>Artists who have run into conflict with the law should declare it and the result of action.</li>
        <li>Artists should not commit crimes with the company name, social media handles bearing the company name, or the company ID card. If caught, the artist will face the law.</li>
        <li>No refund of funds, property, or items of any kind to artists.</li>
        <li>Artists who decide to quit the industry/company do so at their own risk.</li>
        <li>Artists from age 1 year to 75 years can register with us.</li>
        <li>Artists in levels 1-3 are to print their scripts in the company lab.</li>
        <li>Artists in levels 4-5 will get their scripts through PDF or other available apps.</li>
        <li>Artists are to undergo training before appearing on a movie set.</li>
        <li>Training of 1 month doesn’t attract a certificate, but from 6 months/1 year/2 years attracts a certified certificate.</li>
        <li>Five artists will be cast for a particular role, and the best will act the role. This rule applies only to artists in levels 1-3.</li>
        <li>No excuse for absence from location will be accepted, except for death-related cases.</li>
        <li>Artists in levels 4-5 are to provide their costumes.</li>
        <li>Artists will travel within and outside the country for movie shoots.</li>
        <li>Every Thursday of the week is our meeting day, from 10 am to 4 pm.</li>
        <li>Artists must bring their company ID cards to meetings.</li>
        <li>Artists must participate in company club meetings.</li>
        <li>August 11 is the company anniversary ceremony.</li>
        <li>Second Sunday in February is the new year thanksgiving service for artists.</li>
        <li>Third week Friday in April is the widows’ visitation day.</li>
        <li>June 1 is hospital visitation day.</li>
        <li>Every fourth Saturday of the month celebrates artists born that month.</li>
        <li>September 18 is the orphanage visitation day.</li>
        <li>Four weeks of intensive training are required before entering a movie location.</li>
        <li>November 2-4 is the prison visitation day.</li>
        <li>Second Friday of each month is casting day, from 10 am to 4 pm.</li>
        <li>Training days are Monday, Wednesday, and Friday of each week, from 9 am to 1 pm.</li>
        <li>No artist should bring non-registered members to meetings.</li>
        <li>Late meeting attendance attracts a fine of ₦3,000.</li>
        <li>Leaving meetings early attracts a fine of ₦5,000.</li>
        <li>Failure to attend meetings attracts a fine of ₦20,000.</li>
        <li>Artists must contribute to company events.</li>
        <li>Artist payment depends on the artist’s level.</li>
        <li>No artist should post company events on personal social media. Violators will face the law.</li>
        <li>All phones must be off during meetings. Violators will be expelled and face the law.</li>
        <li>The company will manage social media accounts for artists.</li>
        <li>Artists must engage with and promote the company’s social media posts.</li>
        <li>Artists must introduce new members before their contract expires.</li>
        <li>Disputes between artists or crews should be reported to management. Unresolved cases may be escalated to the police.</li>
        <li>Artists who do not introduce new members will not play lead roles.</li>
        <li>November carnival dates: third to fourth Fridays.</li>
        <li>December award nights: second to third Fridays.</li>
        <li>Artists cannot register with another industry while with us.</li>
        <li>Artists who violate company rules will be blacklisted.</li>
        <li>Relationships between artists and crew members or co-artists will result in a 4-year suspension.</li>
        <li>Membership termination attracts a fine of ₦500,000.</li>
        <li>Failure to attend company events attracts a fine of ₦100,000.</li>
        <li>Artists are awarded yearly for their performances.</li>
        <li>Artists must renew expired company ID cards.</li>
        <li>Writers can sell scripts to management.</li>
        <li>Instant payments are made to eligible artists (levels 3-5) before appearing on set.</li>
      </ol>
      <p>Thank you for your cooperation.</p>
      <button onClick={navigate(-1)} >
        Back To Form
      </button>
    </div>
  );
};

export default TermsAndConditions;
