angular.module('Cabinet')
  .controller('CV_account_plan',
    function(S_selfapi, S_utils) {
      var ctr = {};

      ctr.pricingPlan = {};

      S_selfapi.getPricingPlans().then(function(resp){
        ctr.plans = resp.data.plans;
        ctr.pricingPlan = _.find(ctr.plans, function(plan){
          return plan.id === resp.data.pricing_plan;
        });
        ctr.paidUntil = resp.data.paid_until;
      });

      ctr.getCurrentPlanName = function(){
        return ctr.pricingPlan.name;
      }

      ctr.thisIsCurrentPlan = function(plan){
        return plan.id === ctr.pricingPlan.id;
      }

      return ctr;
    }
  );
 