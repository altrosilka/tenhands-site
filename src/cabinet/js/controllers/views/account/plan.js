angular.module('Cabinet')
  .controller('CV_account_plan',
    function(S_selfapi, S_utils, __showPaymentRequsetSecs, resp) {
      var ctr = this;

      ctr.getCurrentPlanName = function() {
        return ctr.pricingPlan.name;
      }

      ctr.thisIsCurrentPlan = function(plan) {

        return plan.id === ctr.pricingPlan.id;
      }


      ctr.pricingPlan = {};

      ctr.plans = resp.data.plans;
      ctr.pricingPlan = _.find(ctr.plans, function(plan) {
        return plan.id === resp.data.pricing_plan;
      });

      var time = +resp.data.paid_until;
      var now = +moment().format('X');

      if (time === 0) {
        return;
      }
      ctr.paidUntilStr = moment(time, 'X').fromNow();
      if (time > now) {
        if (now + __showPaymentRequsetSecs > time) {
          ctr.paidUntilStr_now = true;
        } else {
          ctr.paidUntilStr_future = true;
        }
      } else {
        ctr.paidUntilStr_past = true;
      }



    }
  );
