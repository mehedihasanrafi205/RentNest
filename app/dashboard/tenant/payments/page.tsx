import React from "react";
import { getMyPaymentsAction } from "../../_action/tenant/paymentActions";
import { PaymentsView } from "../../_components/tenant/PaymentsView";


export default async function TenantPaymentsPage() {
  const response = await getMyPaymentsAction();
  const payments = response.success ? response.data : [];

  return <PaymentsView payments={payments} />;
}